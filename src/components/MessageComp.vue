<template>
    <div :class="class">
        <p >{{ msg }}</p>
    </div>
</template>

<script>
    export default {
        name: 'MessageComp',
        props: {
            msg: String,
            erro: Boolean
        },
        data() {
            return({
                class: "message-container"
            })
        },
        beforeUpdate() {
            this.class = "message-container" + (this.erro ? " error" : "");
        }
    }
</script>

<style scoped>
    .message-container {
        color: #004085;
        background-color: #cce5ff;
        border: 2px solid #b8daff;
        border-radius: 5px;
        padding: 10px;
        max-width: 400px;
        margin: 30px auto;
        text-align: center;
    }

    .error {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
    }
</style>