using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.Extensibility;

namespace ProjectASP.Loging.Serilog
{
    public class TelemetryInitializer : ITelemetryInitializer
    {
        private readonly string _roleName;
        private readonly string _roleInstance;

        public TelemetryInitializer(string roleName, string roleInstance)
        {
            _roleName = roleName;
            _roleInstance = roleInstance;
        }

        public void Initialize(ITelemetry telemetry)
        {
            telemetry.Context.Cloud.RoleName = _roleName;
            telemetry.Context.Cloud.RoleInstance = _roleInstance;
        }
    }
}
