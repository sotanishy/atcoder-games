# Generated by Django 3.0.5 on 2020-04-12 03:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0002_auto_20200412_1250'),
    ]

    operations = [
        migrations.AddField(
            model_name='problem',
            name='contest_id',
            field=models.CharField(default='test_001', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='problem',
            name='problem_id',
            field=models.CharField(default='test_001', max_length=200),
            preserve_default=False,
        ),
    ]