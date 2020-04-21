using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Reflection.Metadata;
using System.Security.Cryptography;
using System.Text;

namespace GraphFlowNode
{
    class Program
    {
        private IEnumerable<string> Split(string origin) => origin.Aggregate(
            (new List<string>(), default(string)),
            (o, v) => (o.Item2, v) switch
                      {
                          (null, " ") => (o, ),
                          (_, char c) =>
                      });

        static void Main(string[] args) { }
    }
}