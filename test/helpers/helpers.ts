/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
import { timeSecond as d3TimeSecond, timeMinute as d3TimeMinute, timeHour as d3TimeHour, timeDay as d3TimeDay } from "d3-time";

import { RgbColor, parseColorString } from "powerbi-visuals-utils-colorutils";
import { DurationUnits } from "../../src/gantt";

export function areColorsEqual(firstColor: string, secondColor: string): boolean {
    const firstConvertedColor: RgbColor = parseColorString(firstColor),
        secondConvertedColor: RgbColor = parseColorString(secondColor);

    return firstConvertedColor.R === secondConvertedColor.R
        && firstConvertedColor.G === secondConvertedColor.G
        && firstConvertedColor.B === secondConvertedColor.B;
}

export function isColorAppliedToElements(
    elements: HTMLElement[] | SVGElement[],
    color?: string,
    colorStyleName: string = "fill"
): boolean {
    return elements.some((element: HTMLElement | SVGElement) => {
        const currentColor: string = element.style.getPropertyValue(colorStyleName);

        if (!currentColor || !color) {
            return currentColor === color;
        }

        return areColorsEqual(currentColor, color);
    });
}

/**
* Calculates end date from start date and offset for different durationUnits
* @param durationUnit
* @param start Start date
* @param step An offset
*/
export function getEndDate(durationUnit: string, start: Date, end: Date): Date[] {
    switch (durationUnit) {
        case DurationUnits.Second.toString():
            return d3TimeSecond.range(start, end);
        case DurationUnits.Minute.toString():
            return d3TimeMinute.range(start, end);
        case DurationUnits.Hour.toString():
            return d3TimeHour.range(start, end);
        default:
            return d3TimeDay.range(start, end);
    }
}