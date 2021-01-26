import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ISimpleMasterData, IPagedQuery } from '../../config/models/master.model';
import * as $ from 'jquery';

@Component({
  selector: 'selectPaging',
  templateUrl: './select-paging.component.html',
  styleUrls: ['./select-paging.component.css']
})

export class SelectPagingComponent {
	@Input() options:any[] = [];
	@Input() placeholder:string = "Choose";
	@Input() filter:boolean = false;
	@Input() disabled:boolean = false;
	@Input() totalRecords:number = 0;
	@Input() rows:number = 0;
	@Input() selected:any;
	@Input() set isReturnString(condition:boolean)
	{
		this.isAbleReturnString = condition;
	}

	@Output() onChange = new EventEmitter<ISimpleMasterData>();
	@Output() onLoad = new EventEmitter<IPagedQuery>();

	selectState:string="unfocus";

	isWindowActive:boolean = false;
	isAbleReturnString:boolean;

	totalPage:number=1;
	pages:number[] = [];

	pageQuery:IPagedQuery = {
		page:1,
		itemsPerPage:10,
		search:""
	};

	constructor(){
		$(document).on("click",()=>{
			if(!this.isWindowActive){
				this.selectState = "unfocus"
			}
			this.isWindowActive = false;
		});

		this.totalPage = Math.ceil(this.totalRecords / this.rows);
		for(let i = 1; i <= this.totalPage; i++){
			this.pages.push(i);
		}
	}

	placeholderClick()
	{
		if(this.disabled)
			return false;
		
		this.isWindowActive = true;
		this.selectState = "focus";
	}

	onClickEv(event)
	{
		this.selected = {
			ID: !this.isAbleReturnString ? parseInt(event.target.value):$(event.target).find('.strID').val(),
			nama:event.target.innerText
		};

		this.onChange.emit(this.selected);
	}

	getArrayPage(total:number, rowsShow:number):number[]{
		let arrPage = new Array(Math.ceil(total/rowsShow));
		return arrPage;
	}

	searchEv(event){
		this.pageQuery.page = 1;
		this.pageQuery.search = event.target.value;
		this.onLoad.emit(this.pageQuery);
	}

	btnSearchEv(event){
		let searchQuery = $(event.target).closest('.input-group').find('#filter').val().toString();
		this.pageQuery.page = 1;
		this.pageQuery.search = searchQuery;
		this.onLoad.emit(this.pageQuery);
	}

	pageLoad(pageNumber)
	{
		this.pageQuery.page = pageNumber;
		this.onLoad.emit(this.pageQuery);
	}

	pagePrev()
	{
		let currentPage = this.pageQuery.page;
		currentPage--;
		if(currentPage > 0)
		{
			this.pageQuery.page = currentPage;
			this.onLoad.emit(this.pageQuery);
		}
	}

	pageNext(total:number, rowsShow:number)
	{
		let max = Math.ceil(total/rowsShow);
		let currentPage = this.pageQuery.page;
		currentPage++;
		if(currentPage <= max)
		{
			this.pageQuery.page = currentPage;
			this.onLoad.emit(this.pageQuery);
		}
	}
}