```shell
node v18.18.0

install yarn

bash <(curl -s https://raw.githubusercontent.com/Alipex-spuier/gpt/main/scripts/setup.sh)

//需要切换到自己的项目，fork本项目，并且修改readme和setup.sh
```
api池管理：位于app/config/apiConfig/apiPool.ts文件内。添加apikey时，向apiKeys数组添加即可。  
  
敏感词管理：位于app/utils/sensitiveWordsComtroller/sensitiveWordsPool.ts文件内。添加敏感词时，向sensitiveWords数组添加敏感词即可。
