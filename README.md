jQuery ASCII
============
jQuery ASCII is an extrimally simple & lightweight (~1,5kb) jQuery plugin for HTML-TO-ASCII table converting.

* Author: Vladimir Kostyukov http://vkostyukov.ru
* License: Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0.html)
* Project page: https://github.com/vkostyukov/jquery-ascii

Usage example
-------------

Source table

```html
<table id="html-table">
	<tr><th>Header 1</th><th>Header 2</th></tr>
	<tr><td>Cell 1</td><td>Cell 2</td></tr>
	<tr><td>Cell 3</td><td>Cell 4</td></tr>
</table>
```

Target block
```html
<div id="ascii-table"></div>
```

jQuery code
```javascript
$(document).ready(function() {
	$("#ascii-table").html($("#html-table").ascii());
});
```

Result table in `#ascii-table` block

	+---------------------+
	| Header 1 | Header 2 |
	+---------------------+
	| Cell 1   | Cell 2   |
	| Cell 3   | Cell 4   |
	+---------------------+

Raw Table Format
----------------

There is also `raw` format available for generated table. This format uses native symbols for spaces and newlines. The `raw` format can be specified by following:
```javascript
$("#html-table").ascii("raw")
```

Other
-----
See `demo.html` for more details.
