
/* ---------------------------------------------------------------------
  pdf,別窓のアイコンなどの付与。
  ---------------------------------------------------------------------*/

$(function(){	
	addIconPath='/hogehohe/fugafuga/'; //画像のパス
		
	//class名を追記
	addIcon(".className");
	
	function addIcon(imgIcon) {
		windowNewIcon = imgIcon;
		//pdficon付与
		$(imgIcon).find("a[href$='.pdf']").attr({target:"_blank"}).after('<span><img src="'+addIconPath+'imgPath.gif"'+'alt="open  pdf file"></span>');
		//別窓icon付与
		$(windowNewIcon).find('a[target=_blank]').not("a[href$='.pdf']").after('<span><img src="'+addIconPath+'imgPath.gif"'+'alt="open the new window"></span>');	
	}

});