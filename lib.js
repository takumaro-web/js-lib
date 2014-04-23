/*
* Copyright (c) 2013 muraki-takuma / paradox-tm.com
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

	backToTop();

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


/* ---------------------------------------------------------------------
	RWD対応　カルーセル
  ---------------------------------------------------------------------*/

/*
---------------------------------------------------------------------
想定されるマークアップ
---------------------------------------------------------------------

<div id="wrap-box-mainvisual">
	<div id="box-mainvisual">
		<ul id="list-main-visual">
			<li class="active"><a href=""><img src="common/images/img-mainVisual-01.jpg" alt=""></a></li>
			<li><a href=""><img src="common/images/img-mainVisual-02.jpg" alt=""></a></li>
			<li><a href=""><img src="common/images/img-mainVisual-03.jpg" alt=""></a></li>
			<li><a href=""><img src="common/images/img-mainVisual-04.jpg" alt=""></a></li>
			<li><a href=""><img src="common/images/img-mainVisual-05.jpg" alt=""></a></li>
		</ul>	
	</div>
</div>

---------------------------------------------------------------------
Sample style (sass) 
---------------------------------------------------------------------

#wrap-box-mainvisual {
	width: 100%;
	position: relative;
}

#box-mainvisual {
	min-width: 960px;
	width: 960px;
	margin: 0 auto;
	overflow: hidden;
}

#list-main-visual{
	overflow: hidden;
}

@media screen and (max-width:960px){
	#box-mainvisual {
		min-width: 100%;
		width: 100%;	
	}
}

#list-main-visual {
	position: relative;
	display: table;
	li{
		overflow: hidden;
		img{
			width: 100%;
		}
	}
}

.back {
	position: absolute;
	top: 50%;
	left: -10px;
	z-index: 1;
}

.next{
	position: absolute;
	top: 50%;
	right: -10px;
	z-index: 1;
}

*/

$(function(){
		var Wrapper = $("#box-mainvisual").prepend('<p class="back"><a href="#">前へ</a></p><p class="next"><a href="#">次へ</a></p>');
		var obj = $(Wrapper),		
		bnrList = $(obj).find("#list-main-visual"),
		bnrListWidth = 0,
		bnrItem = $(obj).find("#list-main-visual").find("li"),
		bnrNum = $(bnrItem).length,
		btnBack = $(obj).find(".back").find("a"),
		btnNext = $(obj).find(".next").find("a"),
		defaultImageSize = 960,//max-main-visual-size
		windowSize = $(window).width(),
		slideSpeed = 500, //slide speed
		loopSpeed = 5000, //loop speed
		anmFlg = false;

		//GET List width
		for(var i=0; bnrNum+1 > i; i++){
			bnrListWidth = bnrListWidth + $(bnrItem[i]).width();
		}

		//Write slide list width
		$(bnrList).css({width:bnrListWidth});
		$(bnrItem).css('display', 'table-cell');
		
		//reload
		reloadFunction();
		//resize
		resizeFunction();

		//Next Button
		$(btnNext).click(function(){
			moveSlide(true);
		});
		
		//Back Button
		$(btnBack).click(function(){
			moveSlide(false);
		});

		//Stop timer
		Wrapper.each(function(){
			$(this).mouseover(function(){
    			console.log("stop timer(hover)");
				stopTimer(true,false);
    		});

    		$(this).mouseleave(function(){
    			console.log("start timer(mouse out)");
				stopTimer(false,false);
    		});
		});

		//Stop timer
		var arrayItem = [btnNext,btnBack];
		$.each(arrayItem, function(){	
    		this.focus(function(){ // stop timer by focus
				stopTimer(false,true);
    		});
			this.blur(function(){ // start timer by focus out
				stopTimer(false,false);
    		});
		});


		/* -----------------------------------
			Function
		----------------------------------- */

		//Reload
		function reloadFunction(){
			window.onload = function() {
				if(960 > windowSize){
	  			defaultImageSize = windowSize;
	  			}
			};
		}

		//Resize
		function resizeFunction() {
			$(window).resize(function() {
				windowSize = $(window).width();
				bnrListResize = bnrNum * windowSize;
				if(960<=windowSize){
					$(bnrItem).css(
						"width", 960
					);
					bnrList.css(
						"width", 960 * bnrNum
					);
					defaultImageSize = 960;
				}else if(960>windowSize){
					$(bnrItem).css(
						"width", windowSize
					);
					bnrList.css(
						"width", bnrListResize
					);
					defaultImageSize = windowSize;
				}
			});
		}

		//Slider
		function moveSlide(status) {
			if(anmFlg === false){
				anmFlg = true;
				//Animation move right	
				if(status === true) {
					$(bnrList).animate({marginLeft : -defaultImageSize},slideSpeed,function(){				
					$(bnrList).css({marginLeft : 0});
					$(bnrList).find("li:last").after($(bnrList).find("li").eq(0));
					anmFlg = false;
					});
					return false;
				//Animation move left
				}else if(status === false) {				
					$(bnrList).css({marginLeft : -defaultImageSize});
					$(bnrList).find("li").eq(0).before($(bnrList).find("li:last"));
					$(bnrList).animate({marginLeft : 0},slideSpeed,function(){
						anmFlg = false;
					}); 
					return false;
				}else{
					alert("error");
				}
			}else{
				return false;
			}
		};

		//Timer
		var loopSlideTimer = setInterval(function(){
			moveSlide(true);
			},loopSpeed);

		//Stop timer function
		 function stopTimer(mouseOver, focusIn) {
   			if(mouseOver === true && focusIn === false) {
   					clearInterval(loopSlideTimer);
   			}else if(mouseOver === false && focusIn === true) {
   					clearInterval(loopSlideTimer);
   			}else{
   				    loopSlideTimer = setInterval(
					function(){moveSlide(true);},loopSpeed);
					console.log("moveing");
   			}
 		}
});
