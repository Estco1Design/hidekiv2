import json, secrets, time, atexit, subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright
BASE='http://localhost:3000'
results=[]
accounts=[]
def cleanup():
    if not accounts: return
    code = "import Database from 'better-sqlite3'; import fs from 'node:fs'; if(fs.existsSync('.env.local'))process.loadEnvFile('.env.local'); const db=new Database((process.env.HIDEKI_DATA_DIR||'.local')+'/hideki.sqlite');db.pragma('foreign_keys = ON');const emails=JSON.parse(fs.readFileSync(0,'utf8')); for(const email of emails) db.prepare('DELETE FROM user WHERE email = ?').run(email);db.close();"
    subprocess.run(['node','--input-type=module','-e',code],input=json.dumps(accounts),text=True,check=True)
atexit.register(cleanup)
def passed(name):
    results.append({'check':name,'status':'passed'});print('PASS',name,flush=True)
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--enable-unsafe-swiftshader'])
    context=browser.new_context(viewport={'width':1440,'height':1000})
    assert context.request.get(BASE+'/api/account-capabilities').json()['emailDelivery'] is False, "Disable real email delivery in this test environment"
    page=context.new_page();errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(BASE);page.wait_for_load_state('networkidle');page.wait_for_timeout(3600)
    assert page.locator('.brand-intro').count()==0
    assert page.locator('h1').inner_text().startswith('HIDEKI')
    page.screenshot(path='qa/home-desktop.png',full_page=True);passed('Home + intro completion')
    intro_context=browser.new_context(viewport={'width':1280,'height':900})
    intro_page=intro_context.new_page();intro_page.goto(BASE)
    intro_page.wait_for_selector('.intro-phase-orbit')
    assert intro_page.locator('.brand-intro').evaluate('e=>getComputedStyle(e).opacity')=='1'
    intro_page.screenshot(path='qa/intro-orbit.png')
    intro_page.wait_for_selector('.brand-intro',state='detached');intro_context.close()
    skip_context=browser.new_context();skip_page=skip_context.new_page();skip_page.goto(BASE)
    skip_page.get_by_role('button',name='Пропустить',exact=True).click()
    assert skip_page.locator('.brand-intro').count()==0
    assert not skip_page.locator('#main-content').evaluate('e=>e.inert')
    skip_context.close();passed('Intro orbit visible + skip releases page')
    page.goto(BASE+'/account');page.wait_for_load_state('networkidle')
    assert page.locator('h1').inner_text()=='Личный кабинет'
    page.wait_for_selector('canvas');assert page.locator('.model-fallback').count()==0
    page.get_by_role('button',name='Обхват талии',exact=True).click()
    assert 'Не втягивайте' in page.locator('.measurement-hint').inner_text()
    page.locator('.rotation-control input').fill('110')
    page.evaluate('window.scrollTo(0,0)');page.screenshot(path='qa/account-desktop.png',full_page=True);passed('3D model + measurement selection + keyboard rotation')
    assert context.request.get(BASE+'/api/measurements').status==401
    passed('Anonymous measurements access denied')
    page.goto(BASE+'/login');page.get_by_role('button',name='Первый раз здесь? Создать аккаунт').click()
    email='qa-'+secrets.token_hex(6)+'@example.test';accounts.append(email);password=secrets.token_urlsafe(24)
    page.locator('input[name=name]').fill('QA account');page.locator('input[name=email]').fill(email);page.locator('input[name=password]').fill(password);page.locator('input[type=checkbox]').check()
    page.get_by_role('button',name='Создать аккаунт',exact=True).click();page.wait_for_url('**/account');page.wait_for_load_state('networkidle')
    page.locator('input[name=neck]').fill('38');page.locator('input[name=height]').fill('180');page.get_by_role('button',name='Сохранить мерки',exact=True).click()
    page.get_by_role('status').filter(has_text='Мерки сохранены').wait_for()
    page.reload();page.wait_for_load_state('networkidle');assert page.locator('input[name=neck]').input_value()=='38'
    passed('Account registration + server save + reload persistence')
    page.locator('input[name=neck]').fill('39')
    page.locator('nav button').filter(has_text='RU').first.click()
    assert page.locator('input[name=neck]').input_value()=='39'
    page.locator('nav button').filter(has_text='EN').first.click()
    assert page.locator('input[name=neck]').input_value()=='39'
    passed('Language switch preserves unsaved measurements')

    r=context.request.put(BASE+'/api/measurements',data={'neck':999},headers={'Origin':BASE});assert r.status==400
    r=context.request.put(BASE+'/api/measurements',data={'neck':38},headers={'Origin':'https://attacker.example'});assert r.status==403
    passed('Measurement validation + cross-origin write denied')
    second=browser.new_context();email2='qa-'+secrets.token_hex(6)+'@example.test';accounts.append(email2);r=second.request.post(BASE+'/api/auth/sign-up/email',data={'name':'QA second','email':email2,'password':secrets.token_urlsafe(24)},headers={'Origin':BASE});assert r.status==200,r.status
    r=second.request.get(BASE+'/api/measurements');assert r.status==200 and r.json()['measurements']=={}
    second.close();passed('Cross-account measurement isolation')
    page.goto(BASE+'/private');page.wait_for_load_state('networkidle');assert 'Некоторые истории' in page.locator('.private-lead').inner_text();passed('Registration does not grant private access')
    page.goto(BASE+'/account');page.get_by_role('button',name='Выйти из кабинета').click();page.get_by_role('link',name='Войти / Создать аккаунт').wait_for();assert context.request.get(BASE+'/api/measurements').status==401
    page.goto(BASE+'/login');page.locator('input[name=email]').fill(email);page.locator('input[name=password]').fill(password);page.get_by_role('button',name='Войти',exact=True).click();page.wait_for_url('**/account');passed('Sign out revokes access + sign in')
    page.goto(BASE+'/shop');page.wait_for_load_state('networkidle');page.get_by_role('button',name='Арт-объекты').click();assert page.locator('.shop-empty').is_visible();page.get_by_role('button',name='Одежда',exact=True).click();page.get_by_role('link',name='Посмотреть изделие').click();page.wait_for_url('**/shop/object-001');page.get_by_role('button',name='02',exact=True).click();page.get_by_role('link',name='Обсудить изготовление').click();page.wait_for_url('**/contact?object=object-001&size=02');page.wait_for_load_state('networkidle');page.wait_for_function("document.querySelector('#message').value.includes('SIZE 02')");passed('Shop filters + size selection + inquiry prefill')
    # Mock the provider-unavailable response: never send a real inquiry from QA.
    page.route('**/api/inquiry',lambda route:route.fulfill(status=503,content_type='application/json',body='{"error":"Delivery not configured"}'))
    page.locator('#name').fill('QA form');page.locator('#contact').fill('qa@example.test')
    page.locator('input[type=checkbox]').check();page.get_by_role('button',name='ОТПРАВИТЬ ЗАПРОС').click()
    page.get_by_role('status').filter(has_text='Онлайн-отправка пока не подключена').wait_for()
    assert 'SIZE 02' in page.locator('textarea[readonly]').input_value()
    context.grant_permissions(['clipboard-read','clipboard-write'])
    page.get_by_role('button',name='Скопировать бриф').click();page.get_by_role('button',name='Скопировано',exact=True).wait_for()
    page.unroute('**/api/inquiry');passed('Consent + delivery failure preserves brief + copy')

    for route in ['/work','/studio','/about','/archive','/shop/object-002','/work/echoes-of-silence','/privacy']:
        r=page.goto(BASE+route);assert r.status==200,(route,r.status);page.wait_for_load_state('networkidle')
    passed('All existing page families render')
    r=page.goto(BASE+'/missing-page');assert r.status==404;passed('404 response')
    assert not errors,errors
    passed('No uncaught browser exceptions')
    mobile=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce');mp=mobile.new_page()
    for route in ['/','/account','/shop','/login','/private','/contact']:
        mp.goto(BASE+route);mp.wait_for_load_state('networkidle');assert mp.evaluate('document.documentElement.scrollWidth <= window.innerWidth'),route
        if route in ['/','/account','/shop']:mp.screenshot(path='qa/'+('home' if route=='/' else route[1:])+'-mobile.png',full_page=True)
    mp.get_by_role('button',name='Меню',exact=True).click();mp.locator('#mobile-menu').get_by_role('link',name='ЛИЧНЫЙ КАБИНЕТ').click();mp.wait_for_url('**/account');assert mp.locator('#mobile-menu').count()==0
    passed('Mobile layouts + menu + reduced motion')
    browser.close()
Path('qa/browser-results.json').write_text(json.dumps({'checks':results,'browser_errors':errors},ensure_ascii=False,indent=2)+'\n')
