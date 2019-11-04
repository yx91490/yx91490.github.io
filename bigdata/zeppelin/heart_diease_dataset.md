# 心脏病预测数据

### 数据描述

[heart-disease.names](http://archive.ics.uci.edu/ml/machine-learning-databases/heart-disease/heart-disease.names)

### 常用数据集（303条）

[processed.cleveland.data](http://archive.ics.uci.edu/ml/machine-learning-databases/heart-disease/processed.cleveland.data)

### 字段

| 字段名   |             含义              | 英文描述                                                     |                                         阿里云数据集描述 |
| :------- | :---------------------------: | ------------------------------------------------------------ | -------------------------------------------------------: |
| age      |             年龄              | age in years                                                 |                                     对象的年龄，数字表示 |
| sex      |             性别              | sex (1 = male; 0 = female)                                   |                                 对象的性别，female和male |
| cp       |         胸部疼痛类型          | chest pain type<br/>-- Value 1: typical angina<br/>-- Value 2: atypical angina<br/>-- Value 3: non-anginal pain<br/>-- Value 4: asymptomatic | 痛感由重到无typical、atypical、non-anginal、asymptomatic |
| trestbps |             血压              | resting blood pressure (in mm Hg on admission to the <br/>        hospital) |                                                 血压数值 |
| chol     |            胆固醇             | serum cholestoral in mg/dl                                   |                                               胆固醇数值 |
| fbs      |           空腹血糖            | (fasting blood sugar > 120 mg/dl)  (1 = true; 0 = false)     |                  血糖含量大于120mg/dl为true，否则为false |
| restecg  |          心电图结果           | resting electrocardiographic results<br/>-- Value 0: normal<br/>-- Value 1: having ST-T wave abnormality (T wave inversions and/or ST <br/>            elevation or depression of > 0.05 mV)<br/>-- Value 2: showing probable or definite left ventricular hypertrophy<br/>            by Estes' criteria |                           是否有T波，由轻到重为norm、hyp |
| thalach  |          最大心跳数           | maximum heart rate achieved                                  |                                               最大心跳数 |
| exang    |       运动时是否心绞痛        | exercise induced angina (1 = yes; 0 = no)                    |                        是否有心绞痛，true为是，false为否 |
| oldpeak  | 运动相对于休息的ST depression | ST depression induced by exercise relative to rest           |                                               st段压数值 |
| slop     |   心电图ST segment的倾斜度    | the slope of the peak exercise ST segment<br/>-- Value 1: upsloping<br/>-- Value 2: flat<br/>-- Value 3: downsloping |                ST segment的slope，程度分为down、flat、up |
| ca       |     透视检查看到的血管数      | number of major vessels (0-3) colored by flourosopy          |                                     透视检查看到的血管数 |
| thal     |           缺陷种类            | 3 = normal; 6 = fixed defect; 7 = reversable defect          |                         并发种类，由轻到重norm、fix、rev |
| status   |           是否患病            |                                                              |                         是否患病，buff是健康、sick是患病 |

### 参考

- [心脏病预测案例](https://help.aliyun.com/document_detail/34929.html)
- [Heart Disease Data Set](http://archive.ics.uci.edu/ml/datasets/Heart+Disease)
