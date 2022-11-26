<template>

    <a-form :model="formState" :rules="rules" name="basic"  :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }" autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed">
        <p class="login_title">系统登录</p>
        <a-form-item label="Username" name="username"
            :rules="[{ required: true, message: 'Please input your username!'},{required:true,pattern: /[a-z][\da-z0-9]{3,7}/,message:'错误',trigger: ['change','blur'],}]">
            <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="Password" name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>

        <p>
        <p>这是请求到的数据{{ testData.list }}</p>
        </p>
    </a-form>
</template>
<script lang="ts">
import testData from '@/mock';
import axios from '@/model/axios';
import { message } from 'ant-design-vue';
import { defineComponent, reactive } from 'vue';
import * as _ from 'lodash'

interface FormState {
    username: string;
    password: string;
    remember: boolean;
}

export default defineComponent({
    setup() {

        //测试数据
        const testData = reactive({
            list: []
        });
        //正则验证
        const rules = reactive({
            Username: [
                { required: true, message: "用户名不能为空",pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, },
                {   
                    trigger: "change",
                },
            ],
            userpwd: [
                { required: true, message: "密码不能为空" },
                {  trigger: "blur" },
            ],
        });




        const formState = reactive<FormState>({
            username: '',
            password: '',
            remember: true,
        });
        const onFinish =_.throttle((values: any) => {
            axios({
                url: '/login',
                method: 'get'
            }).then((res) => {
                // alert('请求成功!');
                testData.list = res.data.dataList;
                console.log(testData.list)
            });
        },2000,{
            leading: true,
            trailing: false
        }) ;

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };
        return {
            formState,
            onFinish,
            onFinishFailed,
            testData,
            rules
        };
    },
});
</script>
  
  