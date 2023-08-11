using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Newtonsoft.Json.Converters;

namespace BetApp.Enums
{
	public enum BetType
	{
		TeamA,
		TeamB,
		Draw,
		None,
		Minus2_5,
		Plus2_5,
		Minus3_5,
		Plus3_5,
		Minus4_5,
		Plus4_5
	}
}
