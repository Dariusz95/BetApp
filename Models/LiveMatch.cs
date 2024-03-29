﻿using BetApp.Enums;

namespace BetApp.Models
{
	public class LiveMatch
	{
		public Guid Id { get; set; }
		public Team TeamA { get; set; }
		public Team TeamB { get; set; }
		public int TeamAScore { get; set; }
		public int TeamBScore { get; set; }
		public int Counter { get; set; }
		public bool? IsOver { get; set; }
		public bool? IsBetWin { get; set; }
		public BetType BetType { get; set; }
	}
}
