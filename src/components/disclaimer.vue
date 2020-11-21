<template lang="html">
    <v-dialog
        v-model="dialog"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        width="600">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            聲明/Disclaimer
          </v-card-title>

          <v-card-text>
              <ol>
                  <li>本應用程式指在提供更方便更多功能的界面作搜尋康文署康體班之用。<br>This application aim at providing more convenient user interface with richer functionality for searching Leisure and Cultural Services Department (LCSD) Community Recreation and Sports Programmes. </li>
                  <li>本應用程式並非康文署提供之官方應用程式/網站，資訊或有誤差及延遲，只作參考。欲知最新最準確的資料請瀏覽康文署網站。<br>This application is not an official application/website provided by the LCSD. The information may have errors and delays and is for reference only. For the latest and most accurate information, please visit the LCSD website. </li>
                  <li>本應用程式使用香港政府資料一線通服務所提供的康文署康樂活動資料集（JSON格式），資料集格式及詳情請參閱資料一線通網頁。<br>This application uses the LCSD's Community Recreation and Sports Programmes data set (JSON format) provided by the Hong Kong Government DATA.GOV.HK. For the format and details of the data set, please refer to DATA.GOV.HK</li>
                  <li>本應用程式不涉任何用戶個人資訊。<br>This application does not involve any user personal information.</li>
              </ol>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="agreeing_disclaimer()">
              同意/Agree
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'disclaimer',
    data: () => ({
    }),
    computed: {
        dialog: function(){
            return !this.$store.state.disclaimer_agreed;
        },
    },
    methods: {
        agreeing_disclaimer: function(){
            this.$store.commit('replying_disclaimer', true)
        }
    },
    mounted: function(){
        
    }
}
</script>

<style lang="css" scoped>
</style>
