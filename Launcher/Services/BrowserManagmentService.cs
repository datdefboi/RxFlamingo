using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;

class BrowserManagementService : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
        {
            FileName = "https://localhost:5001",
            UseShellExecute = true
        });
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {

    }
}