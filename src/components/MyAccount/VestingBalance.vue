<template>
    <div class="mb-2" style="border-bottom: 1px solid #444;">

              Length: <b>{{ formattedLength }} days</b> (expires {{ remainingVesting }}) <br/>
              Amount: <b>{{ formattedAmount }} KAVA</b>
    </div>
</template>

<script>
import moment from 'moment';
import numbro from 'numbro';

export default {
    props: ['amount', 'length', 'start'],
    computed: {
        formattedAmount() {
            return numbro(this.amount / 1000000).format({thousandSeparated: true, mantissa: 2});
        },
        remainingVesting() {
            const a = moment();
            const b = moment((parseInt(this.start) + parseInt(this.length)) * 1000);           
            return a.to(b);
        },
        formattedLength() {
            return moment.duration({seconds: this.length}).asDays();
        }
    }
}
</script>