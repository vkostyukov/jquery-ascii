/*!
 * jQuery plugin for converting HTML tables into ASCII representation
 *
 * Version: 0.3.0 (Jan 2013)
 *
 * Copyright 2011-2012, Vladimir Kostyukov http://vkostyukov.ru
 * License: http://www.apache.org/licenses/LICENSE-2.0.html
 * Project page: https://github.com/vkostyukov/jquery-ascii
 */
(function ($) {
	$.fn.ascii = function(format) {
		var newline = "<br/>";
		var space = "&nbsp;";

		if (format == "raw") {
			newline = "\n";
			space = " ";
		}

		if (!this.is("table")) {
			return "+----------------------------+"
				+ newline + "| Source isn't a html table. |" + newline
				+ "+----------------------------+";
		}

		var data = [];
		var lengths = [];
		var header = -1;

		var row = 0, column = 0;
		this.find("tr").each(function() {
			var line = data[row] || [];
			column = 0;
			$(this).find("td,th").each(function() {
				var span = {
					row: parseInt($(this).attr("rowspan")) || 1,
					col: parseInt($(this).attr("colspan")) || 1
				};

				while(line[column]) column++;

				for (var i = column; i < column + span.col; i++) {
					line[i] = $(this).html();

					if (lengths[i] == undefined
						|| $(this).html().length > lengths[i]) {
						lengths[i] = $(this).html().length;
					}

					for (var j = row + 1; j < row + span.row; j++) {
						var next = data[j] || [];
						next[i] = $(this).html();
						data[j] = next;
					}
				}

				column += span.col;
			});

			data[row] = line;

			if ($(this).find("th").length > 0) {
				header = row + 1;
			}

			row++;
		});

		var repeat = function(string, times) {
			if (times > 0) return new Array(times + 1).join(string);
			return "";
		};

		var process = function(row, total) {
			var typed = 0;
			var result = "";
			for (var cell in row) {
				var align = 1 + lengths[cell] - row[cell].length
				typed += 2 + row[cell].length + align;
				result += "| " + row[cell] + repeat(space, align);
			}

			if (typed < total - 1) {
				result += "| " + repeat(space, total - typed - 1);
			}

			return result + "|" + newline;
		};

		var total = lengths.length - 1;
		for(var length in lengths) {
			total += lengths[length] + 2;
		}

		var out = "+" + repeat("-", total) + "+" + newline;
		for (var row in data) {
			if (row == header) {
				out += "+" + repeat("-", total) + "+" + newline;
			}
			out += process(data[row], total);
		}

		out += "+" + repeat("-", total) + "+" + newline;

		return out;
	};
}) (jQuery);
