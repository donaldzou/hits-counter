import {type Format, makeBadge, ValidationError} from 'badge-maker'
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import type {Badge} from "~/interfaces/badge";
import { fromString } from 'css-color-converter';

function brightness(color: string) {
    if (color) {
        const cssColor = fromString(color)
        if (cssColor) {
            const rgb = cssColor.toRgbaArray()
            return +((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 255000).toFixed(2)
        }
    }
    return 0
}


export default async function  (config: Badge) {
    let icon = undefined;
    let styles = ["plastic","flat","flat-square","for-the-badge","social"]
    let style = config.style ? (styles.includes(config.style) ? config.style : 'flat') : 'flat'
    let iconColor = '#fff'
    if (style === 'social'){
        iconColor = '#333'
    }else if(config.label){
        iconColor = '#fff'
    }
    else{
        iconColor = brightness(config.color) > 0.69 ? '#333':'#ffffff'
    }
    console.log(brightness(config.color))
    if (config.icon){
        const filePath = resolve(`public/icons/${config.icon}.svg`);
        try {
            const svg = await readFile(filePath, 'utf-8');
            const nSvg = svg.replace('currentColor', iconColor)
            const base64 = Buffer.from(nSvg).toString('base64');
            icon = `data:image/svg+xml;base64,${base64}`
        } catch (error) {
            console.log(error)
            throw createError({ statusCode: 404, statusMessage: 'SVG not found' });
        }
    }

    const format: Format = {
        label: config.label ? config.label : '',
        message: config.message,
        color: config.color ? config.color : 'brightgreen',
        logoBase64 : icon ? icon : '',
        style: style
    }

    return makeBadge(format)
}