<script setup>
    import { ref, computed, inject } from 'vue';

    const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const updateDateGrid = date => {
        const [ _, monthName, __, year] = date.dateString.split(' ');æ
        const numberOfDays = getNumberOfDays(monthName, year);
        const currentMonthDates = [];
        const monthNumber = date.str.getMonth() + 1;
        for(let i = 0; i < numberOfDays; i++) {
            const item = {};
            const day = new Date(`${year}-${monthNumber}-${i+1}`).getDay();
            item.id = i + 1;
            item.dt = i + 1;
            item.day = DAYS[day];
            currentMonthDates.push(item);
        }
        return arrangeGridAccordingToDays(currentMonthDates);
    }

    const getNumberOfDays = (month, year) => {
        const thirtyOneDays = ['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec'];
        if(thirtyOneDays.includes(month)) return 31;
        else if(month === 'Feb') return isLeapYear(year) ? 29 : 28;
        return 30;
    }

    const isLeapYear = year => {
        const firstCondition = year % 4 === 0 && year % 100 !== 0;
        const secondCondition = year % 4 === 0 && year % 100 === 0 && year % 400 === 0;
        if(firstCondition || secondCondition) return true;
        return false;     
    }

    const arrangeGridAccordingToDays = currentMonthDates => {
        let newDateGrid = [];
        const firstDay = DAYS.indexOf(currentMonthDates[0].day);
        for(let i = 0; i <= firstDay; i++){
            if(i < firstDay){
                newDateGrid = [...newDateGrid, {
                    id: Math.random(),
                    dt: '',
                    days: DAYS[i]
                }]
            } else {
                newDateGrid = [...newDateGrid, ...currentMonthDates]
            }
        }
        return newDateGrid;
    }

    const isCurrentMonthAndYear = computed(() => (
        state.value.date.str.getMonth() === current.value.currentMonth &&
        state.value.date.str.getFullYear() === current.value.currentYear
    ))
    
</script>
<template>
    <div class="calndar-grid">
        <div class="days-grid">
            <div
                v-for="day, index in DAYS"
                :key="index"
                class="day"
                :title="day"
            >{{ day[0] }}</div>
        </div>
        <div class="date-grid">
            <div class="date"
                v-for="date in range(31)"
            >
                <div
                    class="val"
                >{{ date }}</div>
        </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .calendarGrid{
        margin-top: 15px;
        display: grid;
        gap: 20px;
        user-select: none;
        .days-grid{
            display: grid;
            grid-template-columns: repeat(7,1fr);
            justify-content: space-between;
            align-items: center;
            .day{
                text-align: center;
                font-weight: bold;
                &.today{
                    color:blueviolet;
                }
            }
        }
        .date-grid{
            display: grid;
            grid-template-columns: repeat(7,1fr);
            justify-content: space-between;
            align-items: center;
            row-gap: 20px;
            .date{
                display: flex;
                justify-content: center;
                cursor: pointer;
                .val{
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 15px;
                    position: relative;
                    background-color: antiquewhite;
                }
            }
        }
    }
</style>