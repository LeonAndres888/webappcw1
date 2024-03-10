(function(){"use strict";var t={4245:function(t,e,r){var o=r(5130),s=r(6768);const n={id:"app"};function a(t,e,r,o,a,i){const c=(0,s.g2)("parent-component"),u=(0,s.g2)("lesson-component"),d=(0,s.g2)("checkout-component");return(0,s.uX)(),(0,s.CE)("div",n,[(0,s.bF)(c,{sitename:a.sitename,cartItemCount:i.cartItemCount,onToggleCart:i.toggleCart},null,8,["sitename","cartItemCount","onToggleCart"]),a.showProduct?((0,s.uX)(),(0,s.Wv)(u,{key:0,lessons:i.sortedProducts,onAddToCart:i.addItemToCart},null,8,["lessons","onAddToCart"])):((0,s.uX)(),(0,s.Wv)(d,{key:1,cart:a.cart,onRemoveFromCart:i.removeItemFromCart},null,8,["cart","onRemoveFromCart"]))])}r(4114);var i=r(4232);const c={id:"app"},u={id:"titlename"};function d(t,e,r,o,n,a){const d=(0,s.g2)("lesson-component"),l=(0,s.g2)("checkout-component");return(0,s.uX)(),(0,s.CE)("div",c,[(0,s.Lk)("header",null,[(0,s.Lk)("h1",u,(0,i.v_)(n.sitename),1),(0,s.Lk)("button",{id:"cartBtn",onClick:e[0]||(e[0]=(...t)=>a.toggleCart&&a.toggleCart(...t))}," 🛒 Cart ("+(0,i.v_)(a.cartItemCount)+") ",1)]),(0,s.Lk)("main",null,[n.showProduct?((0,s.uX)(),(0,s.Wv)(d,{key:0,products:n.products,onAddItemToCart:a.addItemToCart,searchLesson:n.searchLesson,sortAttribute:n.sortAttribute,sortOrder:n.sortOrder,"onUpdate:searchLesson":e[1]||(e[1]=t=>n.searchLesson=t),"onUpdate:sortAttribute":e[2]||(e[2]=t=>n.sortAttribute=t),onUpdateSortOrder:e[3]||(e[3]=t=>n.sortOrder=t)},null,8,["products","onAddItemToCart","searchLesson","sortAttribute","sortOrder"])):((0,s.uX)(),(0,s.Wv)(l,{key:1,cart:n.cart,onRemoveItemFromCart:a.removeItemFromCart,onSubmitOrder:a.submitOrder,validCheckout:a.validCheckout,orderSubmitted:n.orderSubmitted},null,8,["cart","onRemoveItemFromCart","onSubmitOrder","validCheckout","orderSubmitted"]))])])}const l=t=>((0,s.Qi)("data-v-32b703e0"),t=t(),(0,s.jt)(),t),h=["value"],m=["value"],p=l((()=>(0,s.Lk)("option",{value:"title"},"Subject",-1))),v=l((()=>(0,s.Lk)("option",{value:"location"},"Location",-1))),f=l((()=>(0,s.Lk)("option",{value:"price"},"Price",-1))),b=l((()=>(0,s.Lk)("option",{value:"availableInventory"},"Spaces",-1))),C=[p,v,f,b],k=["src","alt"],g=["onClick","disabled"],y={key:0,class:"sold-out"};function L(t,e,r,o,n,a){return(0,s.uX)(),(0,s.CE)("div",null,[(0,s.Lk)("input",{type:"text",value:r.searchLesson,onInput:e[0]||(e[0]=e=>t.$emit("update:searchLesson",e.target.value)),placeholder:"Search lessons...",class:"search-bar"},null,40,h),(0,s.Lk)("select",{value:r.sortAttribute,onChange:e[1]||(e[1]=e=>t.$emit("update:sortAttribute",e.target.value)),class:"dropDown"},C,40,m),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(a.sortedProducts,(e=>((0,s.uX)(),(0,s.CE)("div",{key:e.id,class:"product-card"},[(0,s.Lk)("figure",null,[(0,s.Lk)("img",{src:e.image,alt:e.title},null,8,k)]),(0,s.Lk)("h2",null,(0,i.v_)(e.title),1),(0,s.Lk)("p",null,"Location: "+(0,i.v_)(e.location),1),(0,s.Lk)("p",null,"Price: £"+(0,i.v_)(e.price),1),(0,s.Lk)("p",null,"Spaces: "+(0,i.v_)(e.availableInventory),1),(0,s.Lk)("button",{onClick:r=>t.$emit("add-item-to-cart",e),disabled:0===e.availableInventory}," Add to Cart ",8,g),0===e.availableInventory?((0,s.uX)(),(0,s.CE)("p",y,"Sold Out")):(0,s.Q3)("",!0)])))),128))])}var I={props:["products","searchLesson","sortAttribute","sortOrder"],computed:{filteredProducts(){let t=this.searchLesson.trim().toLowerCase();return this.products.filter((e=>e.title.toLowerCase().includes(t)||e.location.toLowerCase().includes(t)))},sortedProducts(){let t="ascending"===this.sortOrder?1:-1;return this.filteredProducts.slice().sort(((e,r)=>"price"===this.sortAttribute||"availableInventory"===this.sortAttribute?(e[this.sortAttribute]-r[this.sortAttribute])*t:e[this.sortAttribute].localeCompare(r[this.sortAttribute])*t))}}},O=r(1241);const S=(0,O.A)(I,[["render",L],["__scopeId","data-v-32b703e0"]]);var A=S;const P=t=>((0,s.Qi)("data-v-8cf8e786"),t=t(),(0,s.jt)(),t),w={class:"checkout-container"},T=P((()=>(0,s.Lk)("h1",null,"Shopping Cart",-1))),E={key:0},_={class:"cart-list"},j=["onClick"],X=["disabled"],N={key:0,class:"thank-you-message"},q={key:1,class:"empty-cart-message"};function F(t,e,r,n,a,c){return(0,s.uX)(),(0,s.CE)("div",w,[T,r.cart.length>0?((0,s.uX)(),(0,s.CE)("div",E,[(0,s.Lk)("ul",_,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(r.cart,((t,e)=>((0,s.uX)(),(0,s.CE)("li",{key:e,class:"cart-item"},[(0,s.eW)((0,i.v_)(t.title)+" - "+(0,i.v_)(t.location)+" - £"+(0,i.v_)(t.price)+" ",1),(0,s.Lk)("button",{class:"remove-btn",onClick:e=>c.removeItemFromCart(t)}," Remove ",8,j)])))),128))]),(0,s.Lk)("form",{class:"checkout-form",onSubmit:e[2]||(e[2]=(0,o.D$)(((...t)=>c.submitOrder&&c.submitOrder(...t)),["prevent"]))},[(0,s.bo)((0,s.Lk)("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=t=>a.custName=t),placeholder:"Name",required:""},null,512),[[o.Jo,a.custName]]),(0,s.bo)((0,s.Lk)("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=t=>a.custPhone=t),placeholder:"Phone number",required:""},null,512),[[o.Jo,a.custPhone]]),(0,s.Lk)("button",{type:"submit",class:"checkout-btn",disabled:!c.validCheckout}," Checkout ",8,X)],32),a.orderSubmitted?((0,s.uX)(),(0,s.CE)("p",N," Thank you for your order! ")):(0,s.Q3)("",!0)])):((0,s.uX)(),(0,s.CE)("div",q,"Your cart is empty."))])}var $={props:{cart:Array},data(){return{custName:"",custPhone:"",orderSubmitted:!1}},computed:{validCheckout(){const t=/^[A-Za-z\s]+$/,e=/^[0-9()-]+$/;return t.test(this.custName)&&e.test(this.custPhone)}},methods:{removeItemFromCart(t){this.$emit("remove-item-from-cart",t)},submitOrder(){this.validCheckout?(this.$emit("submit-order",{name:this.custName,phone:this.custPhone,items:this.cart}),this.orderSubmitted=!0,this.custName="",this.custPhone=""):alert("Please enter valid name and phone number.")}}};const x=(0,O.A)($,[["render",F],["__scopeId","data-v-8cf8e786"]]);var W=x,U={components:{LessonComponent:A,CheckoutComponent:W},data(){return{sitename:"👨‍🎓 STUDY SESSION STORE 👩‍🎓",showProduct:!0,products:[],cart:[],searchLesson:"",sortAttribute:"title",sortOrder:"ascending",custName:"",custPhone:"",orderSubmitted:!1}},computed:{cartItemCount(){return this.cart.reduce(((t,e)=>t+e.quantity),0)},validCheckout(){const t=/^[A-Za-z\s]+$/,e=/^[0-9()-]+$/;return t.test(this.custName)&&e.test(this.custPhone)}},methods:{fetchLessons(){fetch("https://storefinal-env.eba-vfsgptpf.us-east-1.elasticbeanstalk.com/api/lessons").then((t=>t.json())).then((t=>{this.products=t})).catch((t=>{console.error("Error fetching lessons:",t)}))},submitOrder(t){if(!this.validateOrder(t))return void alert("Invalid order details.");const e="https://storefinal-env.eba-vfsgptpf.us-east-1.elasticbeanstalk.com/api/orders";fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t.name,phoneNumber:t.phone,items:this.cart.map((({id:t,quantity:e})=>({lessonId:t,quantity:e})))})}).then((t=>t.json())).then((t=>{console.log("Order submitted successfully:",t),this.orderSubmitted=!0,this.cart=[]})).catch((t=>console.error("Order submission failed:",t)))},updateLessonSpaces(t,e=!1){if(!e)return Promise.resolve();const r=t.map((t=>fetch(`https://storefinal-env.eba-vfsgptpf.us-east-1.elasticbeanstalk.com/api/lessons/${t.lessonId}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({numberToDecrease:t.quantity})}).then((t=>{if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return t.json()}))));return Promise.all(r).then((()=>{this.fetchLessons()})).catch((t=>{console.error("Error updating lessons:",t)}))},canAddToCart(t){let e=this.cart.find((e=>e.id===t.id)),r=e?e.quantity:0;return t.availableInventory>r},addItemToCart(t){if(t.availableInventory<=0)return void alert("This lesson is fully booked.");t.availableInventory--;let e=this.cart.find((e=>e.id===t.id));e?e.quantity++:this.cart.push({...t,quantity:1})},updateSortOrder(t){this.sortOrder=t},removeItemFromCart(t){let e=this.cart.findIndex((e=>e.id===t.id));if(e>-1){let r=this.cart[e];r.quantity>1?r.quantity--:this.cart.splice(e,1);let o=this.products.find((e=>e.id===t.id));o&&o.availableInventory++}},toggleCart(){this.showProduct=!this.showProduct}},mounted(){this.fetchLessons()}};const R=(0,O.A)(U,[["render",d],["__scopeId","data-v-e6fd15fa"]]);var D=R,J={name:"App",components:{ParentComponent:D,LessonComponent:A,CheckoutComponent:W},data(){return{sitename:"👨‍🎓 STUDY SESSION STORE 👩‍🎓",showProduct:!0,products:[],cart:[],searchLesson:"",sortAttribute:"title",sortOrder:"ascending"}},computed:{cartItemCount(){return this.cart.reduce(((t,e)=>t+e.quantity),0)},sortedProducts(){let t=[...this.products].sort(((t,e)=>{let r=0;return t[this.sortAttribute]<e[this.sortAttribute]?r=-1:t[this.sortAttribute]>e[this.sortAttribute]&&(r=1),"ascending"===this.sortOrder?r:-1*r}));return t}},methods:{toggleCart(){this.showProduct=!this.showProduct},addItemToCart(t){let e=this.cart.find((e=>e.id===t.id));e?e.quantity+=1:this.cart.push({...t,quantity:1})},removeItemFromCart(t){const e=this.cart.findIndex((e=>e.id===t.id));-1!==e&&this.cart.splice(e,1)},fetchLessons(){fetch("https://storefinal-env.eba-vfsgptpf.us-east-1.elasticbeanstalk.com/api/lessons").then((t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()})).then((t=>{this.products=t})).catch((t=>{console.error("Error fetching lessons:",t)}))}},mounted(){this.fetchLessons()}};const Q=(0,O.A)(J,[["render",a]]);var Y=Q;const z=(0,o.Ef)(Y);z.mount("#app"),"serviceWorker"in navigator&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("/service-worker.js").then((t=>{console.log("SW registered: ",t)})).catch((t=>{console.log("SW registration failed: ",t)}))}))}},e={};function r(o){var s=e[o];if(void 0!==s)return s.exports;var n=e[o]={exports:{}};return t[o].call(n.exports,n,n.exports,r),n.exports}r.m=t,function(){var t=[];r.O=function(e,o,s,n){if(!o){var a=1/0;for(d=0;d<t.length;d++){o=t[d][0],s=t[d][1],n=t[d][2];for(var i=!0,c=0;c<o.length;c++)(!1&n||a>=n)&&Object.keys(r.O).every((function(t){return r.O[t](o[c])}))?o.splice(c--,1):(i=!1,n<a&&(a=n));if(i){t.splice(d--,1);var u=s();void 0!==u&&(e=u)}}return e}n=n||0;for(var d=t.length;d>0&&t[d-1][2]>n;d--)t[d]=t[d-1];t[d]=[o,s,n]}}(),function(){r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,{a:e}),e}}(),function(){r.d=function(t,e){for(var o in e)r.o(e,o)&&!r.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={524:0};r.O.j=function(e){return 0===t[e]};var e=function(e,o){var s,n,a=o[0],i=o[1],c=o[2],u=0;if(a.some((function(e){return 0!==t[e]}))){for(s in i)r.o(i,s)&&(r.m[s]=i[s]);if(c)var d=c(r)}for(e&&e(o);u<a.length;u++)n=a[u],r.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return r.O(d)},o=self["webpackChunkwebappcw1"]=self["webpackChunkwebappcw1"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=r.O(void 0,[504],(function(){return r(4245)}));o=r.O(o)})();
//# sourceMappingURL=app.555675ab.js.map