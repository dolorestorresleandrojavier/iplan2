function daysInMonth(year,month){
return new Date(year, month, 0).getDate();
}

(function($){
$.fn.jsRapCalendar = function(options){

return this.each(function(){
	this.opt = $.extend({
		week:0,
		daysName:['Su','Mo','Tu','We','Th','Fr','Sa'],
		monthsNames:['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'],
		onClick:null
	},options);
	let base = this;
	let curDate = new Date();
	this.curYear = curDate.getFullYear();
	this.curMonth = curDate.getMonth();
	this.curDay = curDate.getDate();
	let curWeek = curDate.getDay();
	this.selY = this.curYear;
	this.selM = this.curMonth;
	this.selD = this.curDay;
	$(this).addClass('rapCalendar');
	let table = $('<table>').appendTo($(this));
	this.caption = $('<caption>').appendTo(table);
	this.cap = $('<span>').appendTo(this.caption);
	this.larr = $('<div>').addClass('larr').appendTo(this.caption);
	this.rarr = $('<div>').addClass('rarr').appendTo(this.caption);
	let dayNames = $('<tr>').appendTo(table);
	for(let n = 0;n < 7;n++)
		$('<th>').text(this.opt.daysName[(n + 7 - this.opt.week) % 7]).appendTo(dayNames);
	let tbody = $('<tbody>').appendTo(table);

	$(this.larr).bind({
		click:function(e){
			base.ShowMonth(base.curYear,base.curMonth,-1);
		}
	});

	$(this.rarr).bind({
		click:function(e){
			base.ShowMonth(base.curYear,base.curMonth,1);
		}
	});

	this.ShowMonth = function(year,month,del){
		this.curYear = year;
		this.curMonth = month + del;
		if(this.curMonth < 0){
			this.curMonth = 11;
			this.curYear--;
		}
		if(this.curMonth > 11){
			this.curMonth = 0;
			this.curYear++;
		}
		$(this.cap).text(this.opt.monthsNames[this.curMonth] + ' ' + this.curYear);
		$(tbody).empty();
		let dim = daysInMonth(this.curYear,this.curMonth + 1);
		let tr = $('<tr>').appendTo(tbody);
		let td = null;
		let fd =  (new Date(this.curYear,this.curMonth,1).getDay()  + this.opt.week) % 7;
		for(var n = 0;n < fd;n++)
			td = $('<td>').appendTo(tr);
		for(var n = 1;n <= dim;n++){
			if($(tr).children().length > 6)
				tr = $('<tr>').appendTo(tbody);
			let d = $('<td id="'+this.opt.monthsNames[this.curMonth]+"-"+n+'">').text(n).appendTo(tr);
			if((this.selY == this.curYear) && (this.selM == this.curMonth) && (this.selD == n))
				$(d).addClass('selected');
		}
		$('tbody td',this).bind({
			click:function(e){
				$('td',base).removeClass('selected');
				if($(this).hasClass('selected')===false){
					console.log("thisId"+$(this).attr('id'));
					if($(this).hasClass('weekend')===false){
						$(this).addClass('selected');
					}
				}else{
					$(this).removeClass('selected');
				}

				base.selY = base.curYear;
				base.selM = base.curMonth;
				base.selD = $(this).text();
				if(base.opt.onClick)
				if($(this).hasClass('weekend')===false){
					base.opt.onClick.call(this,base.selY,base.selM + 1,base.selD);
				}
			}
		});
	}

	this.ShowMonth(this.curYear,this.curMonth,0);

})

}})(jQuery);
