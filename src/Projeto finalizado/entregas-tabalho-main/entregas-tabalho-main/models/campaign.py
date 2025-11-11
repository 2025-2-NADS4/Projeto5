from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Campaign(db.Model):
    __tablename__ = 'campaigns'
    id = db.Column(db.Integer, primary_key=True)
    campaignId = db.Column(db.String(50), unique=True, nullable=False)
    campaignName = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50))
    dayOfWeek = db.Column(db.String(20))
    hour = db.Column(db.Integer)
    listSize = db.Column(db.Integer)
    isSegmented = db.Column(db.String(10))
    openRate = db.Column(db.Float)
    clickRate = db.Column(db.Float)
    date = db.Column(db.String(20))  # data do envio
    qtdeEmails = db.Column(db.Integer)
    qtdeConversoes = db.Column(db.Integer)

    def to_dict(self):
        """Transforma o objeto em dicionário (para enviar como JSON)"""
        return {
            "id": self.id,
            "campaignId": self.campaignId,
            "campaignName": self.campaignName,
            "type": self.type,
            "dayOfWeek": self.dayOfWeek,
            "hour": self.hour,
            "listSize": self.listSize,
            "isSegmented": self.isSegmented,
            "openRate": self.openRate,
            "clickRate": self.clickRate,
            "date": self.date,
            "qtdeEmails": self.qtdeEmails,
            "qtdeConversoes": self.qtdeConversoes
        }
