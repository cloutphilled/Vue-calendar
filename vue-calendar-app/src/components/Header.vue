<script setup>
    import { ref, inject } from 'vue'
    import chev from '../assets/chev.svg'

    const MONTHS = {
        Jan: "January",
        Feb: "February",
        Mar: "March",
        Apr: "April",
        May: "May",
        Jun: "June",
        Jul: "July",
        Aug: "August",
        Sep: "September",
        Okt: "Oktober",
        Nov: "November",
        Dec: "December"
    }

    const state = inject('store')
    const [ _, month, _, year] = state.value.date.dateString.split(' ')
    const current = ref ({
        month: MONTHS[month],
        year
    })

    const handleClick = (direction) => dispatch({type: 'updateDate', payload: {direction}})

    watch(() => state.value.date, (updateDate) => {
        const [_, month, __, year] = updatedDate.dateString.split(' ')

        current.value = {
            month: MONTH[month],
            year
        }
    })
</script>
<template>
    <div class="header">
        <div class="info">
            <div class="year">
                <p>{{ current.year }}</p>
            </div>
        </div>
        <div class="wrapper">
            <div class="left-chev chev">
                <img :src="chev" alt="left-chevron">
            </div>
            <div class="month">
                <h2>{{ current.month }}</h2>
            </div>
            <div class="right-chev chev">
                <img :src="chev" alt="right-chevron">
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .header{
        display: flex;
        flex-direction: column;
        padding: 10px;
        background-color: antiquewhite;
        border-radius: 5px 5px 0 0;
        .wrapper{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            .month {
                h2{
                    font-size: 32px;
                    font-weight: bolder;
                    letter-spacing: 5.5px;
                }
            }
            .chev{
                user-select: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: background-color .5s;
                &:hover{
                    background-color: rgb(243, 206, 158);
                }
                img{
                    width: 100%;
                    height: auto;
                    transform: translateX(2px);
                }
            }
            .left-chev{
                transform: rotate(180deg);
            }
        }
    }
</style>