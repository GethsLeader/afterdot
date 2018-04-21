(function (window) {
    if (!window) {
        throw new Error('Script was write to works only in browser. Feel free to modify it\'s for ur needs as u want.');
    }

    if (window.debug) {
        console.debug = console.log.bind(console);
    } else {
        if (!console.debug) {
            console.debug = function (value) {
                // do nothing, I guess?
            }
        }
    }

    function XSi18n(languageName, languageDetails) {
        this.details = {};
        if (languageName && languageDetails) {
            this.initLanguage(languageName, languageDetails)
        }
    }

    XSi18n.prototype.initLanguage = function (languageName, languageDetails) {
        this.details[languageName] = languageDetails;
    };

    XSi18n.prototype.tr = function (languageName, key, mutation) {
        var found = this.details[languageName][key];
        if (found) {
            if (typeof found === 'string') {
                return found;
            }
            if (mutation) {
                var mutated = found[mutation];
                if (mutated || mutated === '') {
                    return mutated;
                }
            }
            if (found.default || found.default === '') {
                return found.default;
            }
        }
        return key;
    };

    var i18n = new XSi18n('ru-KZ', {
        "separator": {
            "default": " целых и ",
            "1": " целая и "
        },
        "0": {
            "default": "ноль"
        },
        "1": {
            "default": "один",
            "000": "одна",
            ".0": "одна",
            ".00": "одна",
            ".000": "одна",
            ".000000": "одна",
            ".000000000": "одна",
            ".000000000000": "одна"
        },
        "2": {
            "default": "два",
            "000": "две",
            ".0": "две",
            ".00": "две",
            ".000": "две",
            ".000000": "две",
            ".000000000": "две",
            ".000000000000": "две"
        },
        "3": {
            "default": "три"
        },
        "4": {
            "default": "четыре"
        },
        "5": {
            "default": "пять"
        },
        "6": {
            "default": "шесть"
        },
        "7": {
            "default": "семь"
        },
        "8": {
            "default": "восемь"
        },
        "9": {
            "default": "девять"
        },
        "10": {
            "default": "десять"
        },
        "11": {
            "default": "одиннадцать"
        },
        "12": {
            "default": "двенадцать"
        },
        "13": {
            "default": "тринадцать"
        },
        "14": {
            "default": "четырнадцать"
        },
        "15": {
            "default": "пятнадцать"
        },
        "16": {
            "default": "шестнадцать"
        },
        "17": {
            "default": "семнадцать"
        },
        "18": {
            "default": "восемнадцать"
        },
        "19": {
            "default": "девятнадцать"
        },
        "20": {
            "default": "двадцать"
        },
        "30": {
            "default": "тридцать"
        },
        "40": {
            "default": "сорок"
        },
        "50": {
            "default": "пятьдесят"
        },
        "60": {
            "default": "шестьдесят"
        },
        "70": {
            "default": "семьдесят"
        },
        "80": {
            "default": "восемьдесят"
        },
        "90": {
            "default": "девяносто"
        },
        "100": {
            "default": "сто"
        },
        "200": {
            "default": "двести"
        },
        "300": {
            "default": "триста"
        },
        "400": {
            "default": "четыреста"
        },
        "500": {
            "default": "пятьсот"
        },
        "600": {
            "default": "шестьсот"
        },
        "700": {
            "default": "семьсот"
        },
        "800": {
            "default": "восемьсот"
        },
        "900": {
            "default": "девятьсот"
        },
        "000": {
            "default": "тысяча",
            "few": "тысячи",
            "lot": "тысяч"
        },
        "000000": {
            "default": "миллион",
            "few": "миллиона",
            "lot": "миллионов"
        },
        "000000000": {
            "default": "миллиард",
            "few": "миллиарда",
            "lot": "миллиардов"
        },
        "000000000000": {
            "default": "триллион",
            "few": "триллиона",
            "lot": "триллионов"
        },
        ".0": {
            "default": "десятая",
            "few": "десятых",
            "lot": "десятых"
        },
        ".00": {
            "default": "сотая",
            "few": "сотых",
            "lot": "сотых"
        },
        ".000": {
            "default": "тысячная",
            "few": "тысячных",
            "lot": "тысячных"
        },
        ".+10": {
            "default": "десяти"
        },
        ".+100": {
            "default": "сто"
        },
        ".000000": {
            "default": "миллионная",
            "few": "миллионных",
            "lot": "миллионных"
        },
        ".000000000": {
            "default": "миллиардная",
            "few": "миллиардных",
            "lot": "миллиардных"
        },
        ".000000000000": {
            "default": "триллиардная",
            "few": "триллиардных",
            "lot": "триллиардных"
        }
    });

    function AfterDot(i18n, defaultLanguage) {
        this._defaultLanguage = defaultLanguage;
        this._i18n = i18n;
    }

    AfterDot.prototype._nullsPrepare = function (value) {
        var result = '';
        for (var i = 0; i < value; i++) {
            result += '000';
        }
        return result;
    };

    AfterDot.prototype._format = function (value, hasAfterDot, probablyAfterNulls) {
        var result = '';
        if (value > 0) {
            // #1 moving number to triplets, to calculate how it's really big
            var triplets = [];

            while (value > 0) {
                triplets.unshift(value % 1000);
                value = Math.floor(value / 1000);
            }
            console.debug('triplets', triplets);
            // #2 parse all hundreds, teens and singles to details
            var details = [];
            var parts, i, nulls, ctrl, count;
            for (i = 0; i < triplets.length; i++) {
                parts = {
                    hundreds: 0,
                    teens: 0,
                    singles: 0,
                    teensCtrl: 0
                };
                parts.singles = triplets[i] % 10;
                parts.teensCtrl = triplets[i] % 100;
                parts.teens = parts.teensCtrl - parts.singles;
                parts.hundreds = triplets[i] - parts.teens - parts.singles;
                details.unshift(parts);
            }
            console.debug('details', details);
            // #3 trying to build proper phrase for number
            if (probablyAfterNulls) {
                probablyAfterNulls = '.' + probablyAfterNulls;
            }
            for (i = triplets.length - 1; i >= 0; i--) {
                nulls = this._nullsPrepare(i);
                if (details[i].hundreds) {
                    result += ' ' + this._i18n.tr(this._defaultLanguage, details[i].hundreds);
                    console.debug('test', result);
                }
                if (details[i].teensCtrl) {
                    ctrl = this._i18n.tr(this._defaultLanguage, details[i].teensCtrl, nulls || probablyAfterNulls || (hasAfterDot ? '000' : ''));
                    if (ctrl !== details[i].teensCtrl) {
                        result += ' ' + ctrl;
                    } else {
                        ctrl = '';
                    }
                    console.debug('test', result);
                }
                if (!ctrl) {
                    if (details[i].teens) {
                        result += ' ' + this._i18n.tr(this._defaultLanguage, details[i].teens);
                    }
                    if (details[i].singles) {
                        result += ' ' + this._i18n.tr(this._defaultLanguage, details[i].singles, nulls || probablyAfterNulls || (hasAfterDot ? '000' : ''));
                    }
                    console.debug('test', result);
                }
                console.debug('triplets nulls', nulls);
                count = '';
                ctrl = details[i].singles;
                if (details[i].teensCtrl > 10 && details[i].teensCtrl < 20) {
                    ctrl = details[i].teensCtrl;
                }
                if (ctrl > 1 && ctrl < 5) {
                    count = 'few';
                } else if (ctrl !== 1) {
                    count = 'lot'
                }
                if (nulls && (details[i].hundreds || details[i].teens || details[i].singles)) {
                    result += ' ' + this._i18n.tr(this._defaultLanguage, nulls, count);
                    console.debug('test', result);
                }
            }
        } else {
            result += this._i18n.tr(this._defaultLanguage, '0');
            console.debug('test', result);
        }
        return result.trim();
    };

    AfterDot.prototype.format = function (value) {
        if (typeof value !== 'string') {
            value = value.toString();
        }

        var result = '';

        // before dot and after dot to different calculation processes
        var splitValue = value.split('.'),
            beforeDot = splitValue[0] || '0',
            afterDot = splitValue[1] || '0',
            bd = parseInt(beforeDot),
            ad = parseInt(afterDot);
        console.debug('beforeDot', beforeDot);
        console.debug('afterDot', afterDot);

        // before dot
        result += this._format(bd, ad);

        // after dot
        if (ad) {
            var nulls = '',
                last = bd % 100,
                count = '',
                step = '',
                ctrl = '',
                cut = '',
                i;
            for (i = 0; i < afterDot.length; i++) {
                nulls += '0';
            }
            ctrl = last;
            if (last <= 10 || last >= 20) {
                ctrl = bd % 10;
            }
            if (ctrl > 1 && ctrl < 5) {
                count = 'few';
            } else if (ctrl !== 1) {
                count = 'lot'
            }
            result += this._i18n.tr(this._defaultLanguage, 'separator', last);
            while (!step && nulls) {
                step = this._i18n.tr(this._defaultLanguage, '.' + nulls, count);
                if (step === '.' + nulls) {
                    step = '';
                    nulls = nulls.substr(1);
                    cut += '0';
                }
            }
            result += this._format(ad, ad, nulls) + ' ';
            if (cut) {
                cut = '.+1' + cut;
                result += this._i18n.tr(this._defaultLanguage, cut);
            }
            result += step;
        }

        return result.trim();
    };

    window.afterDot = new AfterDot(i18n, 'ru-KZ');
})(window);