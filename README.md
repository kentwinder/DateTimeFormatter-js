### HOW TO USE

#### FORMAT FROM DATETIME OBJECT OR STRING
	<script type="text/javascript">
		var df = new DatetimeFormatter();
		function doTest() {
			alert(df.format(new Date(), "MM/dd/yyyy HH:mm:ss.fff"));
			alert(df.format("Mar, 20 2010 17:20:12", "MMM, dd yyyy HH:mm:ss", "dd/MM/yyyy");
		}
	</script>

#### FORMAT INCLUDING ERROR MESSAGE
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

#### CONVERT STRING TO DATETIME OBJECT 
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

#### PARAMETERS 

Field        | Code   | Note
-------------|--------|--------------------------------------------
Year         | yyyy   | 4 digits
             | yy     | 2 digits
Month        | MMMM   | Month name in full
             | MMM    | Month name in short
             | MM     | 2 digits - with leading zero
             | M      | 1 or 2 digits - no leading zero
Day          | dddd   | Day of week in full
             | ddd    | Day of week in short
             | dd     | 2 digits - with leading zero
             | d      | 1 or 2 digits - no leading zero
Hour         | HH     | 24 hour - with leading zero
             | H      | 24 hour - no leading zero
             | hh     | 12 hour - with leading zero
             | h      | 12 hour - no leading zero
Minute       | mm     | 2 digits - with leading zero
             | m      | 1 or 2 digits - no leading zero
Second       | ss     | 2 digits - with leading zero
             | s      | 1 or 2 digits - no leading zero
Milisecond   | fff    | 3 digits
             | ff     | 2 digits
             | f      | 1 digit
AM/PM        | TT     | Am/Pm
             | T      | A/P
             | tt     | am/pm
             | t      | a/p

**Note:** `M` and `m` are different
