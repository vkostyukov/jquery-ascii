jQuery.ascii
============
jQuery.ascii is an extrimally simple & lightweight jQuery plugin for HTML-TO-ASCII table converting.

Author: Vladimir Kostykov <vladimir.kostukov@gmail.com>

License: Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0.html)

Usage example
=============

Source table

	<table id="html-table">
		<tr><th>Header 1</th><th>Header 2</th><tr>
		<tr><td>Cell 1</td><td>Cell 2</td><tr>
		<tr><td>Cell 3</td><td>Cell 4</td><tr>
	</table>

jQuery code

	$(document).ready(function() {
		$("#ascii-table").html($("#html-table").ascii());
	});

Result table

	+---------------------+
	| Header 1 | Header 2 |
	+---------------------+
	| Cell 1   | Cell 2   |
	| Cell 3   | Cell 4   |
	+---------------------+