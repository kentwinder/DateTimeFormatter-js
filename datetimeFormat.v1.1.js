// +---------------------------------------------------+
// |                                                   |
// |       DateTime Format v1.1                        |
// |       Last Updated: 19 Jun 2011                   |
// |       By Kent Winder | kentwinder@gmail.com       |
// |                                                   |
// |       Feel free to use this code ^^               |
// |                                                   |
// +---------------------------------------------------+ 
// 
// +------------------------+
// |       HOW TO USE       |
// +------------------------+ 
//
// +---------------------------------------------------+
// |       FORMAT FROM DATETIME OBJECT OR STRING       |
// +---------------------------------------------------+ 
/***
	<script type="text/javascript">
		var df = new DatetimeFormatter();
		function doTest() {
			alert(df.format(new Date(), "MM/dd/yyyy HH:mm:ss.fff"));
			alert(df.format("Mar, 20 2010 17:20:12", "MMM, dd yyyy HH:mm:ss", "dd/MM/yyyy");
		}
	</script>
***/
//
// +--------------------------------------------+
// |       FORMAT INCLUDING ERROR MESSAGE       |
// +--------------------------------------------+
/***
	<script type="text/javascript">
		var df = new DatetimeFormatter();
		function doTest() {
			try {
				alert(df.format("Mar, 20 2010 17:20:12", "dd/MM/yyyy HH:mm:ss", "dd/MM/yyyy");
				alert(df.format("29/02/2009", "dd/MM/yyyy", "MM/dd/yyyy");
			} catch(e) {
				alert(e);
			}
		}
	</script>
***/
//
// +-----------------------------------------------+
// |       CONVERT STRING TO DATETIME OBJECT       |
// +-----------------------------------------------+ 
/***
	<script type="text/javascript">
		var df = new DatetimeFormatter();
		function doTest() {
			try {
				var mydate = df.toDate("Mar, 20 2010 17:20:12", "dd/MM/yyyy HH:mm:ss");
				//--...
				//-- do something with the datetime object here
				//--...
			} catch(e) {
				alert(e);
			}
		}
	</script>
***/
//
// +------------------------+
// |       PARAMETERS       |
// +------------------------+ 
// 
// Field        | Code   | Note
// -------------+--------+--------------------------------------------
// Year         | yyyy   | 4 digits
//              | yy     | 2 digits
// Month        | MMMM   | Month name in full
//              | MMM    | Month name in short
//              | MM     | 2 digits - with leading zero
//              | M      | 1 or 2 digits - no leading zero
// Day          | dddd   | Day of week in full
//              | ddd    | Day of week in short
//              | dd     | 2 digits - with leading zero
//              | d      | 1 or 2 digits - no leading zero
// Hour         | HH     | 24 hour - with leading zero
//              | H      | 24 hour - no leading zero
//              | hh     | 12 hour - with leading zero
//              | h      | 12 hour - no leading zero
// Minute       | mm     | 2 digits - with leading zero
//              | m      | 1 or 2 digits - no leading zero
// Second       | ss     | 2 digits - with leading zero
//              | s      | 1 or 2 digits - no leading zero
// Milisecond   | fff    | 3 digits
//              | ff     | 2 digits
//              | f      | 1 digit
// AM/PM        | TT     | Am/Pm
//              | T      | A/P
//              | tt     | am/pm
//              | t      | a/p
//
// +------------------+
// |       NOTES      |
// +------------------+
// 
// M and m are different
//
// ===================================================================

function DatetimeFormatter() {
	//-- private member variables
	var errorMsg = "";
	var i18n = {
		dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	};
	
	//-- public method pointers
	this.format = format;
	this.toDate = toDate;
	
	//-- ******************* Public Methods ******************* --//
	function format(date, fromFormat, toFormat) {
        if (typeof toFormat === "undefined") {
            //-- date: Date Object
            //-- fromFormat becomes toFormat
            date = date ? new Date(date) : new Date;
            if (isNaN(date)) {
            	throw SyntaxError("Invalid Date");
            } else {
                return _formatDate(date, fromFormat);
            }
        } else {
            //-- date: date string
            var _date = _getDateFromFormat(date, fromFormat);
            if (_date == null) {
            	throw SyntaxError(errorMsg);
            } else {
                return _formatDate(_date, toFormat);
            }
        }
    }
	
	function toDate(dateStr, fromFormat) {
		var _date = _getDateFromFormat(dateStr, fromFormat);
		if (_date == null) {
			throw SyntaxError(errorMsg);
		} else { 
			return _date; 
		}
    }
	//-- **************** End of Public Methods **************** --//
	
	//-- ******************* Private Methods ******************* --//
	function padLeadingZero(val) {
		val = String(val);
		if (val.length < 2) {
			val = "0" + val;
		}
		return val;
	}
	
	function _isInt(val) {
		var digits = "0123456789";
		for (var i = 0; i < val.length; i++) {
			if (digits.indexOf(val.charAt(i)) == -1) { return false; }
		}
		return true;
	}
	
	function _getInt(str, fromIndex, minLength, maxLength) {
		for (var i = maxLength; i >= minLength; i--) {
			var val = str.substring(fromIndex, fromIndex + i);
			if (val.length < minLength) { 
				return null; 
			}
			if (_isInt(val)) { 
				return val; 
			}
		}
		return null;
	}
	
	function _formatDate(date, formatStr) {
		var pattern = /[Dd]{1,4}|M{1,4}|y{1,4}|([HhmsTt])\1?|f{1,3}/g;

		var d = date.getDate(),
			D = date.getDay(),
			M = date.getMonth(),
			y = date.getFullYear(),
			H = date.getHours(),
			m = date.getMinutes(),
			s = date.getSeconds(),
			f = date.getMilliseconds(),
			formats = {
				d: d,
				dd: padLeadingZero(d),
				ddd: i18n.dayNames[D + 7],
				dddd: i18n.dayNames[D],
				M: M + 1,
				MM: padLeadingZero(M + 1),
				MMM: i18n.monthNames[M + 12],
				MMMM: i18n.monthNames[M],
				yy: String(y).slice(2),
				yyyy: y,
				h: H % 12 || 12,
				hh: padLeadingZero(H % 12 || 12),
				H: H,
				HH: padLeadingZero(H),
				m: m,
				mm: padLeadingZero(m),
				s: s,
				ss: padLeadingZero(s),
				t: H < 12 ? "a" : "p",
				tt: H < 12 ? "am" : "pm",
				T: H < 12 ? "A" : "P",
				TT: H < 12 ? "AM" : "PM",
				f: String(f).slice(2),
				ff: padLeadingZero(String(f).slice(1)),
				fff: f
			};

		return formatStr.replace(pattern, function(match) {
			return match in formats ? formats[match] : match.slice(1, match.length - 1);
		});
	}
	
	function _getDateFromFormat(dateStr, fromFormat) {
		var year, month, day, hour = 0, minute = 0, second = 0, milisecond = 0, ampm = "";
		var flagCh = "";
		var token = "";
		var formatIndex = 0;
		var dateStrIndex = 0; //-- Used to mark the index of the next token in the datetime string
		while (formatIndex < fromFormat.length) {
			flagCh = fromFormat.charAt(formatIndex);
			token = "";
			while ((fromFormat.charAt(formatIndex) == flagCh) && (formatIndex < fromFormat.length)) {
				token += fromFormat.charAt(formatIndex++);
			}
			if (token == "yyyy" || token == "yy") {
				if (token == "yyyy") {
					year = _getInt(dateStr, dateStrIndex, 4, 4);
					dateStrIndex += 4;
				} else {
					year = _getInt(dateStr, dateStrIndex, 2, 2);
					dateStrIndex += 2;
				}
				if (year == null) {
					errorMsg = "Invalid Year";
					return null;
				} else {
					if (year.length == 2) {
						if (year > 50) {
							year = 1900 + (year - 0);
						} else {
							year = 2000 + (year - 0);
						}
					}
				}
			} else if (token == "MMMM" || token == "MMM") {
				for (var i = 0; i < i18n.monthNames.length; i++) {
					var _month = i18n.monthNames[i];
					if (dateStr.substring(dateStrIndex, dateStrIndex + _month.length).toLowerCase() == _month.toLowerCase()) {
						month = i + 1;
						if (month > 12) { 
							month -= 12; 
						}
						dateStrIndex += _month.length;
						break;
					}
				}
			} else if (token == "MM" || token == "M") {
				month = _getInt(dateStr, dateStrIndex, 1, 2);
				if (month == null || (month < 1) || (month > 12)) {
					errorMsg = "Invalid Month";
					return null;
				}
				dateStrIndex += month.length;
			} else if (token == "dddd" || token == "ddd") {
				for (var i = 0; i < i18n.dayNames.length; i++) {
					var _day = i18n.dayNames[i];
					if (dateStr.substring(dateStrIndex, dateStrIndex + _day.length).toLowerCase() == _day.toLowerCase()) {
						dateStrIndex += _day.length;
						break;
					}
				}
			} else if (token == "dd" || token == "d") {
				day = _getInt(dateStr, dateStrIndex, 1, 2);
				if (day == null || (day < 1) || (day > 31)) {
					errorMsg = "Invalid Day";
					return null;
				}
				dateStrIndex += day.length;
			} else if (token == "HH" || token == "H" || token == "hh" || token == "h") {
				hour = _getInt(dateStr, dateStrIndex, 1, 2);
				if (hour == null || (hour < 0) || (hour > 23)) {
					errorMsg = "Invalid Hour";
					return null;
				}
				dateStrIndex += hour.length;
			} else if (token == "mm" || token == "m") {
				minute = _getInt(dateStr, dateStrIndex, 1, 2);
				if (minute == null || (minute < 0) || (minute > 59)) {
					errorMsg = "Invalid Minute";
					return null;
				}
				dateStrIndex += minute.length;
			} else if (token == "ss" || token == "s") {
				second = _getInt(dateStr, dateStrIndex, 1, 2);
				if (second == null || (second < 0) || (second > 59)) {
					errorMsg = "Invalid Second";
					return null;
				}
				dateStrIndex += second.length;
			} else if (token == "fff" || token == "ff" || token == "f") {
				milisecond = _getInt(dateStr, dateStrIndex, 1, 3);
				if (milisecond == null || (milisecond < 0) || (milisecond > 999)) {
					errorMsg = "Invalid Milisecond";
					return null;
				}
				dateStrIndex += milisecond.length;
			} else if (token == "TT" || token == "T" || token == "tt" || token == "t") {
				ampm = dateStr.substring(dateStrIndex, dateStrIndex + token.length);
				if (ampm.toLowerCase() == "am" || ampm.toLowerCase() == "a") { ampm = "am"; }
				else if (ampm.toLowerCase() == "pm" || ampm.toLowerCase() == "p") { ampm = "pm"; }
				else {
					errorMsg = "Invalid AM, PM";
					return null;
				}
				dateStrIndex += ampm.length;
			} else {
				if (dateStr.substring(dateStrIndex, dateStrIndex + token.length) != token) {
					errorMsg = "Incompatible Format";
					return null;
				} else { 
					dateStrIndex += token.length; 
				}
			}
		}
		//-- Check whether month has valid day
		if (month == 2) {
			if ((year % 400 == 0) || ((year % 4 == 0) && (year % 100 != 0))) {
				//-- Leap year
				if (day > 29) {
					errorMsg = "Invalid Day of February in Leap Year";
					return null;
				}
			} else {
				if (day > 28) {
					errorMsg = "Invalid Day of Month";
					return null;
				}
			}
		} else if (month == 4 || month == 6 || month == 9 || month == 11) {
			if (day > 30) {
				errorMsg = "Invalid Day of Month";
				return null;
			}
		}
		//-- Hour with am/pm
		if (hour < 12 && ampm.toLowerCase() == "pm") {
			hour = hour - 0 + 12;
		} else if (hour > 11 && ampm.toLowerCase() == "am") {
			errorMsg = "Invalid Hour";
			return null;
		}
		if( hour == 12 && ampm.toLowerCase() == "am") hour = 0;
		try {
			var date = new Date(year, month - 1, day, hour, minute, second, milisecond);
			return date;
		} catch (e) {
			errorMsg = "Invalid Date";
			return null;
		}
	}
	//-- ***************** End of Private Methods **************** --//
}