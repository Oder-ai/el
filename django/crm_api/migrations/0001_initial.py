# Generated by Django 3.2 on 2021-11-06 14:07

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Partner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('first_name', models.CharField(blank=True, max_length=255, null=True)),
                ('last_name', models.CharField(blank=True, max_length=255, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.EmailField(blank=True, max_length=255, null=True)),
                ('note', models.TextField(blank=True, null=True)),
                ('released', models.IntegerField(default=0)),
                ('returned', models.IntegerField(default=0)),
                ('paid', models.IntegerField(default=0)),
                ('debt', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('article_number', models.CharField(max_length=255, unique=True)),
                ('price', models.PositiveIntegerField(default=0)),
                ('total_quantity', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductColor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(max_length=255)),
                ('quantity', models.IntegerField(default=0)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_colors', to='crm_api.product')),
            ],
        ),
        migrations.CreateModel(
            name='Realization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.BooleanField(default=False)),
                ('product_qty', models.IntegerField(default=0)),
                ('pairs_qty', models.IntegerField(default=0)),
                ('created_at', models.DateField()),
                ('released', models.IntegerField(default=0)),
                ('paid', models.IntegerField(default=0)),
                ('debt', models.IntegerField(default=0)),
                ('returned', models.IntegerField(default=0)),
                ('partner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='partner_realizations', to='crm_api.partner')),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='RealizationProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_closed', models.BooleanField(default=False)),
                ('pairs', models.IntegerField(default=0)),
                ('packages', models.IntegerField(default=0)),
                ('bags', models.IntegerField(default=0)),
                ('released', models.IntegerField(default=0)),
                ('paid', models.IntegerField(default=0)),
                ('debt', models.IntegerField(default=0)),
                ('returned', models.IntegerField(default=0)),
                ('color', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_colors_in_realizations', to='crm_api.productcolor')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crm_api.product')),
                ('realization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products_in_realization', to='crm_api.realization')),
            ],
        ),
        migrations.CreateModel(
            name='RealizationProductRefund',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('refund', models.IntegerField(default=0)),
                ('product_qty', models.IntegerField(default=0)),
                ('returned', models.IntegerField(default=0)),
                ('released', models.IntegerField(default=0)),
                ('created_at', models.DateField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='realization_products_refund', to='crm_api.realizationproduct')),
                ('realization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='realizations_refund', to='crm_api.realization')),
            ],
        ),
        migrations.CreateModel(
            name='RealizationProductPayout',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payout', models.IntegerField(default=0)),
                ('released', models.IntegerField(default=0)),
                ('paid', models.IntegerField(default=0)),
                ('debt', models.IntegerField(default=0)),
                ('returned', models.IntegerField(default=0)),
                ('created_at', models.DateField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='realization_products_payout', to='crm_api.realizationproduct')),
                ('realization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='realizations_payout', to='crm_api.realization')),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='ProductSize',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.CharField(max_length=255)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_sizes', to='crm_api.product')),
            ],
        ),
        migrations.CreateModel(
            name='Production',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pairs', models.IntegerField(default=0)),
                ('packages', models.IntegerField(default=0)),
                ('bags', models.IntegerField(default=0)),
                ('created_at', models.DateField()),
                ('defect_worker', models.IntegerField(default=0)),
                ('defect_worker_sum', models.IntegerField(default=0)),
                ('defect_machine', models.IntegerField(default=0)),
                ('defect_machine_sum', models.IntegerField(default=0)),
                ('defect_mehmed', models.IntegerField(default=0)),
                ('defect_mehmed_sum', models.IntegerField(default=0)),
                ('color', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='colors_in_productions', to='crm_api.productcolor')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='product_productions', to='crm_api.product')),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_images', to='crm_api.product')),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='products', to='crm_api.productcategory'),
        ),
        migrations.CreateModel(
            name='CrmUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('role', models.CharField(max_length=250)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
