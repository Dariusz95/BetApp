using BetApp.Enums;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BetApp.Requests
{
	public class MatchRequest
	{
		public Guid MatchId { get; set; }
		public Guid TeamAId { get; set; }
		public Guid TeamBId { get; set; }
		public decimal BetCourse { get; set; }
		[JsonConverter(typeof(JsonStringEnumConverter))]
		public BetType BetType { get; set; }

	}
}
