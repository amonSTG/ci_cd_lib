 const charsArr = [
    { key: 'AT', len: 20 },
    { key: 'BE', len: 16 },
    { key: 'CZ', len: 24 },
    { key: 'DE', len: 22 },
    { key: 'DK', len: 18 },
    { key: 'FR', len: 27 }
];

const chars: Map<String, number> = new Map(
    charsArr.map((item) => {
        return [item.key, item.len];
    }),
);

export function validate(iban: string): boolean {
    if (!checkLength(iban)) {
        return false;
    }

    const rearrangedIban: string = rearrangeIban(iban);
    const convertedIban = convertToInteger(rearrangedIban);
    const segments: string[] = createSegments(convertedIban);
    
    return calculate(segments) === 1;
}

function calculate(segments: string[]): number {
    let n: number = 0;
    
    segments.forEach((segment) => {
        if (segment.length === 9) {
            n = Number(segment) % 97
        } else {
            segment = `${n}${segment}`;
            n = Number(segment) % 97;
        }
    });

    return n;
}

function checkLength(iban: string): boolean {
    const countryCode = iban.substring(0, 2);

    return chars.has(countryCode) && chars.get(countryCode) === iban.length;
}

function convertToInteger(iban: string): string {
    const _iban: string = iban.toUpperCase();

    let convertedIban: string = "";
    for (const c of _iban) {
        if (c.match(/[0-9]/)) {
            convertedIban += c;
        }

        if (c.match(/[A-Z]/)) {
            convertedIban += String(Number(c.charCodeAt(0)) - 55);
        }
    }

    return convertedIban;
}

function createSegments(iban: string): string[] {
    let _iban: string = iban;
    const segments: string[] = [];
    let index: number = 0;

    segments[index++] = _iban.substring(0, 9);
    _iban = _iban.substring(9, _iban.length);

    while (_iban.length >= 9) {
        segments[index++] = _iban.substring(0, 7);
        _iban = _iban.substring(7, _iban.length);
    }

    segments[index++] = _iban

    return segments;
}

function rearrangeIban(iban: string): string {
    return `${iban.substring(4, iban.length)}${iban.substring(0, 4)}`;
}