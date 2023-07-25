<template>
    <div class="container">
        <h3>简单CSS样式</h3>
      <div class="row pt-4">
          <div class="col-md">
              <!-- 用户输入 -->
              <label for="">User Input</label>
                <input type="text" placeholder="" v-model='userInput' @keyup.enter='sendMsg()'class='form-control'>
          </div>
          
          <!-- 工作区域 -->
          <div class="col-md border-left py-2 px-5 h-100 overflow-y-auto text-center">          
               <!-- 聊天内容列表-->
               <ul ref='dialogue' style='list-style-type: none;width:auto;margin-top:auto; margin-bottom:auto;' >
                      <!--<li><strong>会话开始</strong></li>-->
                  </ul>
  
              </div>
  
            </div>
  
       </div>
  </template>
  
  
  <script lang=js>
  
  
  export default {
      name: "BaseChat",
      data(){
        return{
             chatData:[],
             userInput:'',
             sessionId:''
         }
  },
  
  mounted () {
     this.init() // 初始化sessionId
  }, 
  methods:{
       init : async function (){
                const ans = await this.$axios.get('/api/session')  
              this.sessionId =(ans.data).id;
           },
           // 发送消息到后端API(接受GPT回复)
       sendMsg:async function(){
               //添加用户发送信息到对话框列表中
                  if(this.userInput!=""){
                    await  this.updateDialogue('Me',this.userInput);
                  }
            //获取ai的回答并将其添加到对话框列表中
              let response = await this.getResponse();
                  await  this.updateDialogue('AI',response);
          },
        async getResponse(){
             let without_space_input = this.userInput.trim();   
              //调用前端Chat GPT API 
              const ans = await axios.post(
                  '/api/chat/text',{ message :without_space_input,sessionId:this.sessionId} );
              return ans.data.message;
       },
  
      updateDialogue: function(user,message) {
            const ulTags= this.$refs.dialogue ;
            var newli = document.createElement("li");
                var newText=document.createTextNode(message); 
  
             if (user=='Me'){
                   newli.style="text-align:right; color:green";
             }         
             else{
                  newli.style="color:blue";
                  }
             
  
            ulTags.appendChild(newli).appendChild(newText);
  
          },    
  
  
  }
  }
  
  
  </script>
  
  
  <style>
  
  .container{
   width:100%;
   height:50vh;
  }
  
  </style>
  
  