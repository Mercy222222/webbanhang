using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace LangXiMi.Models;

public class ApplicationUser : IdentityUser
{
    [Required]
    [MaxLength(150)]
    public string FullName { get; set; } = string.Empty;
    
    [MaxLength(300)]
    public string? Address { get; set; }
}
