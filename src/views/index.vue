<template>
    <div class="news">
        <!-- <back backTitle="我的消息"></back> -->
        <button @click="test">请求测试按钮</button>
        <h1>Test router index Page</h1>
    </div>
</template>
    
    
<script setup>

import { updatePassword } from "../http/user"

// function test(){
//     console.log(21111)
// }
const test = () =>{
    console.log(11111)
    const param = {
        account: "test",
        password: "test",
    };
    updatePassword(param).then((res) => {
        console.log(res)
        if (res.data.code === '200') {
            console.log("sucess")
        }
    }).catch(error => {
        Toast.fail(error.response.data.message);
    });
};
</script>
    
    
<style scoped>
.news {
    background-color: #f5f6f8;
    padding-bottom: 20px
}

.news button{
    width: 100px;
    height: 20px;
}
</style>