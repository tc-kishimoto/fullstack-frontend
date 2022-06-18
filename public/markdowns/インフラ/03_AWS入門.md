# AWS入門

---

## AWSの基本

### AWS（Amazon Web Services）

Amazon.comが提供しているクラウドコンピューティングサービス。
2016年10月現在、全世界で13の地域に提供され（普通に利用できるのは11）、サーバー台数は600万台（推定）程度になる。
2015年9月時点でクラウドのシェア41%ほど。

### 豊富なサービス

50を超えるサービスが提供され、また高い信頼性と豊富な実績があります。

### 柔軟なリソース

スモールスタートからスケールアウトし、またバーストトラフィックなどにも柔軟に対応できます。

### 従量課金

必要な時に必要なだけリソースを追加できるため、コストパフォーマンスに優れます。

---

### リージョンおよびエッジロケーション

リージョン：各サービスが提供される場所
エッジロケーション：DNSやCDNサービスで提供される場所

![picture 8](/images/a398b38d7c389f1e9598af24473ed6d539593c78d23a9af56782dcebe54f6720.png)  

---

### アベイラビリティゾーン

独立した1つ以上のデータセンターから構成される。
リージョン内には必ず2つ以上配置される。

![picture 9](/images/3ab734719f3ad5c68e56fe3827c13184d4a58b8bfd58934b64e5e4224b380cd9.png)  

---

## AWSの主なサービス

* コンピューティング
  * Amazon EC2
  * Elastic Load Balancing
  * Auto Scaling
* ストレージ＆コンテンツ配信
  * Amazon EBS
  * Amazon S3
  * Amazon CloudFront
  * Amazon Glacier
* データベース
  * Amazon RDS
  * Amazon DynamoDB
  * Amazon ElastiCache
* ネットワーキング
  * Amazon VPC
  * Amazon Route 53
* 開発者ツール
  * AWS SDK
  * AWS CLI
* 管理ツール
  * Amazon CloudWatch
  * AWS CloudFormation
* セキュリティ＆アイデンティティ
  * AWS Identity and Access Management（IAM）
