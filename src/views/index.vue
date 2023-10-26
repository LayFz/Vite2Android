<template>
    <div class="news">
        <button @click="test">请求测试按钮</button>
        <!-- 密码输入框 -->
        <van-password-input :value="value" :focused="showKeyboard" @focus="showKeyboard = true" :gutter="20" :length="4" :errorInfo="errorInfo"/>
        <!-- 数字键盘 -->
        <van-number-keyboard v-model="value" :show="showKeyboard" @blur="showKeyboard = false" />
        <h1>Test router index Page</h1>
    </div>
</template>
    
    
<script setup>

import { updatePassword } from "../http/user"
import { watch } from "vue";
const value = ref("");
const errorInfo = ref("")
const showKeyboard = ref(true);
const test = () => {
    console.log(value)
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
watch(value, (newVal) => {
    if (newVal.length > 4) {
        value = value.toString().substr(0,4)
        errorInfo.value = '只能为四位';
    } else {
        errorInfo.value = '';
    }
});
</script>
    
    
<style scoped>
.news {
    background-color: #f5f6f8;
    padding-bottom: 20px
}

.news button {
    width: 100px;
    height: 20px;
}
</style>