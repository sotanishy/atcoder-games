# Generated by Django 3.0.5 on 2020-04-12 07:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0006_announcement'),
    ]

    operations = [
        migrations.RenameField(
            model_name='announcement',
            old_name='title',
            new_name='message',
        ),
        migrations.RemoveField(
            model_name='announcement',
            name='body',
        ),
    ]
