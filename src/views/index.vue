<template>
    <div>
        <Badge dot>
            <a href="#">测试页面</a>
        </Badge>
    </div>
</template>
<script>
    export default {
        mounted (){
            this.$store.dispatch('testApi');
        },
        methods: {
        }
    }
</script>
