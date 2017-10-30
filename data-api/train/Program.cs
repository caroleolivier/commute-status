using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using System;

namespace train
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("Starting web host...");
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
