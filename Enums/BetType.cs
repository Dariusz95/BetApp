using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;

namespace BetApp.Enums
{
	[JsonConverter(typeof(StringEnumConverter))]
	public enum BetType
	{
		[EnumMember(Value = "TeamA")]
		TeamA = 0,
		TeamB = 1,
		Draw = 2,
		None = 3,
		Minus2_5 = 4,
		Plus2_5 = 5,
		Minus3_5 = 6,
		Plus3_5 = 7,
		Minus4_5 = 8,
		Plus4_5 = 9
	}
}
