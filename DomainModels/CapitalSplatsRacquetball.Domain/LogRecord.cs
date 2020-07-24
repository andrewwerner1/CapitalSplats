using System;
using System.Collections.Generic;
using System.Text;

namespace CapitalSplatsRacquetball.Domain
{
    public class LogRecord
    {
        

        public int Id { get; set; }

        public enum LogLevels { ERROR, INFO, DEBUG }

        public LogLevels LogLevel { get; set; }

        public string Message { get; set; }

        public DateTime DateTime { get; set; }

        public string UserName { get; set; }

        public int IPAddress { get; set; }


    }
}
