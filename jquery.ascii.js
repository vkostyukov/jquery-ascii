/*!
 * jQuery plugin for converting HTML tables into ASCII representation
 *
 * Version: 0.1.0 (Dec 2011)
 *
 * Copyright 2011, Vladimir Kostyukov <vladimir.kostukov@gmail.com>
 * License: http://www.apache.org/licenses/LICENSE-2.0.html
 */
(function ($) {
	$.fn.ascii = function(format) {
		var data = [];
		var header = [];

		var newline = "<br/>";
		var space = "&nbsp;";

		if (format == "raw") {
			newline = "\n";
			space = " ";
		}

		var lengths = [];
		this.find("th").each(function() {
			header[header.length] = $(this).html();
			lengths[lengths.length] = $(this).html().length;
		});

		this.find("tr").each(function() {
			var row = [];
			var column = 0;
			$(this).find("td").each(function() {
				row[row.length] = $(this).html();
				if ($(this).html().length > lengths[column]) {
					lengths[column] = $(this).html().length;
				}
				column++;
			});
			if (row.length == header.length) data[data.length] = row;
		});

		var repeat = function(string, times) {
			if (times > 0) return new Array(times + 1).join(string);
			return "";
		};

		var process = function(row) {
			var result = "";
			for (var cell in row) {
				result += "| " + row[cell] + repeat(space, 1 + lengths[cell] - row[cell].length);
			}
			return result + "|" + newline;
		};

		var total = header.length - 1;
		for(var length in lengths) {
			total += lengths[length] + 2;
		}

		var out = "+" + repeat("-", total) + "+" + newline;
		out += process(header);
		out += "+" + repeat("-", total) + "+" + newline;

		for (var row in data) {
			out += process(data[row]);
		}

		out += "+" + repeat("-", total) + "+" + newline;

		return out;
	};
}) (jQuery);