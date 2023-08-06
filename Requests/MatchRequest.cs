using System.Text.Json.Serialization;
using BetApp.Enums;
using Newtonsoft.Json.Converters;

namespace BetApp.Requests
{
	public class MatchRequest
	{
		public Guid MatchId { get; set; }
		public Guid TeamAId { get; set; }
		public Guid TeamBId { get; set; }
		public decimal BetTypeCourse { get; set; }
		[JsonConverter(typeof(StringEnumConverter))]
		public BetType BetType { get; set; }

	}
}
