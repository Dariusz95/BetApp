using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using BetApp.Enums;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Newtonsoft.Json.Converters;

namespace BetApp.Models
{
	public class MatchResult
	{
		public Guid Id { get; set; }
		public int? TeamAScore { get; set; }
		public int? TeamBScore { get; set; }
		[NotMapped]
		public int? Counter { get; set; }
		public decimal BetTypeCourse { get; set; }
		public BetType BetType { get; set; }

		[NotMapped]
		public bool? IsOver { get; set; }
		public bool? IsWin { get; set; }

		public Team TeamA { get; set; }

		public Team TeamB { get; set; }

		public Coupon? Coupon { get; set; }
	}
}
