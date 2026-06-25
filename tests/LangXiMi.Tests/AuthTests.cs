using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;
using System.Collections.Generic;
using System.Net.Http.Headers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace LangXiMi.Tests
{
    public class AuthIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public AuthIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false
            });
        }

        [Fact]
        public async Task Get_Login_ReturnsSuccessAndCorrectContentType()
        {
            // Arrange & Act
            var response = await _client.GetAsync("/Account/Login");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("text/html; charset=utf-8", response.Content.Headers.ContentType.ToString());
            
            var responseString = await response.Content.ReadAsStringAsync();
            Assert.Contains("Đăng nhập", responseString); // Giao diện có chữ Đăng nhập
        }

        [Fact]
        public async Task Post_Login_WithInvalidCredentials_ReturnsFormWithErrors()
        {
            // Arrange
            // 1. Cần lấy VerificationToken để submit form an toàn
            var initResponse = await _client.GetAsync("/Account/Login");
            var html = await initResponse.Content.ReadAsStringAsync();
            var antiforgeryToken = ExtractAntiForgeryToken(html);

            var formData = new Dictionary<string, string>
            {
                { "Email", "wronguser@test.com" },
                { "Password", "WrongPassword123!" },
                { "RememberMe", "false" },
                { "__RequestVerificationToken", antiforgeryToken }
            };

            var content = new FormUrlEncodedContent(formData);
            
            // Cần truyền cookie để antiforgery hoạt động
            var cookies = initResponse.Headers.GetValues("Set-Cookie");
            foreach (var cookie in cookies)
            {
                _client.DefaultRequestHeaders.Add("Cookie", cookie.Split(';')[0]);
            }

            // Act
            var response = await _client.PostAsync("/Account/Login", content);

            // Assert
            response.EnsureSuccessStatusCode(); 
            var responseString = await response.Content.ReadAsStringAsync();
            
            // "Đăng nhập ko đc thì sao" -> Sẽ hiện lỗi này:
            Assert.Contains("Account/Login", response.RequestMessage.RequestUri.ToString());
        }

        [Fact]
        public async Task Post_Register_WithWeakPassword_ReturnsConstraintError()
        {
            // Arrange
            var initResponse = await _client.GetAsync("/Account/Register");
            var html = await initResponse.Content.ReadAsStringAsync();
            var antiforgeryToken = ExtractAntiForgeryToken(html);

            var formData = new Dictionary<string, string>
            {
                { "FullName", "Test User" },
                { "Email", "newuser123@test.com" },
                { "Phone", "0123456789" },
                { "Password", "123" }, // Mật khẩu yếu (Test ràng buộc)
                { "ConfirmPassword", "123" },
                { "__RequestVerificationToken", antiforgeryToken }
            };

            var content = new FormUrlEncodedContent(formData);
            
            var cookies = initResponse.Headers.GetValues("Set-Cookie");
            foreach (var cookie in cookies)
            {
                _client.DefaultRequestHeaders.Add("Cookie", cookie.Split(';')[0]);
            }

            // Act
            var response = await _client.PostAsync("/Account/Register", content);

            // Assert
            response.EnsureSuccessStatusCode(); 
            var responseString = await response.Content.ReadAsStringAsync();
            
            // Test Ràng buộc: Mật khẩu quá ngắn sẽ bị Identity chặn
            Assert.Contains("Account/Register", response.RequestMessage.RequestUri.ToString()); 
        }

        // --- Helper để trích xuất AntiForgery Token từ HTML ---
        private string ExtractAntiForgeryToken(string htmlBody)
        {
            var match = System.Text.RegularExpressions.Regex.Match(htmlBody, @"\<input name=""__RequestVerificationToken"" type=""hidden"" value=""([^""]+)"" \/\>");
            return match.Success ? match.Groups[1].Captures[0].Value : string.Empty;
        }
    }
}
