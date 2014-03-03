/*
* Copyright (c) 2013 paradox-tm
*
* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"),
* to deal in the Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute, sublicense,
* and/or sell copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
* DEALINGS IN THE SOFTWARE.
*/


/* ---------------------------------------------------------------------
  pdf,別窓のアイコンの付与。
  ---------------------------------------------------------------------*/

$(function(){	
	addIconPath='/hogehohe/fugafuga/'; //画像のパス
		
	//class名を追記
	addIcon(".className");
	
	function addIcon(imgIcon) {
		windowNewIcon = imgIcon;
		//pdficon付与
		$(imgIcon).find("a[href$='.pdf']").attr({target:"_blank"}).after('<span><img src="'+addIconPath+'imgPath_pdf.gif"'+'alt="open  pdf file"></span>');
		//別窓icon付与
		$(windowNewIcon).find('a[target=_blank]').not("a[href$='.pdf']").after('<span><img src="'+addIconPath+'imgPath_window.gif"'+'alt="open the new window"></span>');	
	}

});

/* ---------------------------------------------------------------------
  ページトップに戻るアニメーション。
  ---------------------------------------------------------------------*/

$(function() {
	var backToTop;
	backToTop();

	backToTop = function() {
	  var btnTop;
	  btnTop = $('#ID');
	  btnTop.click(function(event) {
		$('html,body').animate({
		  scrollTop: 0
		}, 1000);
		event.preventDefault();
	  });
	};
});

/* ---------------------------------------------------------------------
  現在地表示（サイドナビ）
  ---------------------------------------------------------------------*/

$(document).ready(function() {
	var activeUrl = location.pathname;
	var condIndex = /\/index\.html?/;
		activeUrl = activeUrl.replace(condIndex).replace(undefined,"/");
		navList = $(".className").find("a"); 
		// .className のaを発見したときに発動
	navList.each(function(){
		if( $(this).attr("href").replace(condIndex).replace(undefined,"/") === activeUrl ) {
			$(this).addClass('current');
		};
	});
});

/* ---------------------------------------------------------------------
  画像保存禁止アラート
  ---------------------------------------------------------------------*/

$(function() {
	var touchTime = 700;
	var $protectElem = $("img"); //class名を別途指定してもOK。
	$protectElem.bind('touchstart',function(){
		longTouchTimer = setTimeout( function(){
			alert( "NO COPY!!!" );
			return false;
		}, touchTime);

		function clearFunction(){ // ロングタッチを止めたときの処理。
			clearTimeout(longTouchTimer);
		}
		$protectElem.bind( "touchend touchmove touchcancel", clearFunction );	
	});
});






