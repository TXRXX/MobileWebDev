new Vue({
	el: '#app',
	data: {
		title : "Work 2: เกมจับคู่ภาพ โดยใช้ VueJS",
		footer :"นายชานน ภาคีนุยะ 633020035-8",
		state :0,
		cards :[],
		cards_opened:[],
		cards_count:0,   
	},
	vuetify: new Vuetify(),
	methods: {
		shuffle(){  
			this.state=1;  
			this.cards=[];
			this.cards_opened=[];
			this.cards_count=36;  
			for(var i=1;i<=18;i++){
				this.cards.push({t:i,s:0});
				this.cards.push({t:i,s:0});
			}
			for(var i=1;i<100;i++){
				var a=Math.round(Math.random()*35);
				var b=Math.round(Math.random()*35);
				var t=this.cards[a];
				this.cards[a]=this.cards[b];
				this.cards[b]=t;
			}
			console.log(cards)
		},
		imgclick(c){
			if(this.cards_opened.length<2){
				c.s = 1;
				this.cards_opened.push(c); 
				if(this.cards_opened.length==2){
					setTimeout(this.checkCard,1000);            
				}                  
			}
		},
		checkCard(){
			var a=this.cards_opened[0];  
			var b=this.cards_opened[1];
			this.cards_opened=[];
			if(a.t==b.t){ 
				a.s=2;      
				b.s=2;
				this.cards_count -= 2;
			}else{
				a.s=0;  
				b.s=0;
			}
			if(this.cards_count==0){  
				this.state = 2;          
			}
		},
	}
	})