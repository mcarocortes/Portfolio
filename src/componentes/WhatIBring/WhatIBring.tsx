
import './WhatIBring.css'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const CARDS = [
    { key: 'productThinking', className: 'one' },
    { key: 'designDevelopment', className: 'two' },
    { key: 'collaborativeMindset', className: 'three' },
    { key: 'aiImprovement', className: 'four' },
    { key: 'qualityFirst', className: 'five' },
] as const

export default function WhatIBring() {
    const { t } = useTranslation()
    const [darkMode, setDarkMode] = useState(
        () => document.body.classList.contains("dark-mode")
    )
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0.1 })

    useEffect(() => {
        const syncDarkMode = () => {
            setDarkMode(document.body.classList.contains("dark-mode"))
        }

        syncDarkMode()

        const observer = new MutationObserver(syncDarkMode)
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["class"],
        })

        return () => observer.disconnect()
    }, [])

    const sectionBackground = !isInView
        ? "var(--purpura)"
        : darkMode
            ? "var(--black)"
            : "var(--skillsBg)"

    return (
        <>
            <motion.section
                ref={ref}
                id="WhatIDo"
                className="page-wrapper-vertical"
                animate={{
                    backgroundColor: sectionBackground
                }}
                transition={{ duration: 0.6 }}
            >
                <div className="main-wrapper-vertical">
                    <div className='section_stack'>
                        <div className='padding-global'>
                            <div className='container-large'>
                                <div className='stack_component'>
                                    <div className='section_description'>
                                        <h1 className="heading">{t("whatIBringSection.title")}</h1>
                                    </div>

                                    {CARDS.map(({ key, className }) => (
                                        <div key={key} className={`stack_card ${className}`}>
                                            <div className='ImgIcon'></div>
                                            <div className='card_description'>
                                                <h3>{t(`whatIBringSection.cards.${key}.title`)}</h3>
                                                <h4 className="card_subtitle">
                                                    {t(`whatIBringSection.cards.${key}.subtitle`)}
                                                </h4>
                                                <p>{t(`whatIBringSection.cards.${key}.description`)}</p>
                                            </div>
                                        </div>
                                    ))}

                                    <div className='stack_card six'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </>
    )
}
