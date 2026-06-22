import asyncio
from crawl4ai import AsyncWebCrawler

async def main():
    print("Starting Crawl4AI...")
    async with AsyncWebCrawler() as crawler:
        print("Crawling VnExpress...")
        result = await crawler.arun(
            url="https://vnexpress.net",
        )
        print("Crawling complete! Saving to vnexpress_result.md...")
        with open("vnexpress_result.md", "w", encoding="utf-8") as f:
            f.write(result.markdown.raw_markdown)
        
        print("Done!")

if __name__ == "__main__":
    asyncio.run(main())
