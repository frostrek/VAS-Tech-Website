import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, DollarSign, TrendingUp, Zap, CheckCircle2, Settings } from 'lucide-react';

export const DynamicCostCalculator = () => {
    const [volume, setVolume] = useState<number>(5000);
    const [costPerUnit, setCostPerUnit] = useState<number>(15);
    const [complexity, setComplexity] = useState<'Low' | 'Medium' | 'High'>('Medium');
    const [animatedSavings, setAnimatedSavings] = useState(0);

    // AI efficiency assumptions based on complexity
    const automationRate = {
        'Low': 0.85,    // 85% automated
        'Medium': 0.70, // 70% automated
        'High': 0.50    // 50% automated
    }[complexity];

    // AI cost assumptions based on complexity
    const aiCostPerUnit = {
        'Low': 0.5,
        'Medium': 1.2,
        'High': 2.5
    }[complexity];

    const currentMonthlyCost = volume * costPerUnit;
    const automatedVolume = volume * automationRate;
    const manualVolume = volume - automatedVolume;
    
    const newMonthlyCost = (automatedVolume * aiCostPerUnit) + (manualVolume * costPerUnit);
    const monthlySavings = currentMonthlyCost - newMonthlyCost;
    const annualSavings = monthlySavings * 12;
    const roiPercentage = ((monthlySavings / newMonthlyCost) * 100).toFixed(0);

    useEffect(() => {
        // Animate the savings number
        const duration = 500;
        const steps = 20;
        const stepTime = duration / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setAnimatedSavings(monthlySavings * (currentStep / steps));
            if (currentStep >= steps) {
                clearInterval(timer);
                setAnimatedSavings(monthlySavings);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [monthlySavings]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <section className="py-24 bg-[#0a0705] relative overflow-hidden border-y border-white/5">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(249,115,22,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                <div className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/08 mb-6">
                        <Calculator size={14} className="text-orange-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-400">Dynamic Cost Analysis</span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif text-white mb-4">
                        Calculate Your <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">AI ROI</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        See exactly how much you can save by automating your repetitive workflows. Adjust the parameters below to match your current operational scale.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 max-w-5xl mx-auto">
                    {/* Controls */}
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="space-y-10">
                            {/* Volume Slider */}
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <label className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                                            <Zap size={16} className="text-orange-500" /> Monthly Task Volume
                                        </label>
                                        <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">Invoices, Tickets, Leads, etc.</span>
                                    </div>
                                    <div className="text-2xl font-serif text-orange-400 font-bold">{volume.toLocaleString()}</div>
                                </div>
                                <input 
                                    type="range" 
                                    min="1000" 
                                    max="50000" 
                                    step="1000"
                                    value={volume}
                                    onChange={(e) => setVolume(Number(e.target.value))}
                                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400 transition-all"
                                />
                                <div className="flex justify-between text-xs text-zinc-600 mt-2 font-mono">
                                    <span>1k</span>
                                    <span>50k+</span>
                                </div>
                            </div>

                            {/* Cost Per Unit Slider */}
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <label className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                                            <DollarSign size={16} className="text-orange-500" /> Current Cost Per Task
                                        </label>
                                        <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">Human processing cost</span>
                                    </div>
                                    <div className="text-2xl font-serif text-orange-400 font-bold">{formatCurrency(costPerUnit)}</div>
                                </div>
                                <input 
                                    type="range" 
                                    min="2" 
                                    max="100" 
                                    step="1"
                                    value={costPerUnit}
                                    onChange={(e) => setCostPerUnit(Number(e.target.value))}
                                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400 transition-all"
                                />
                                <div className="flex justify-between text-xs text-zinc-600 mt-2 font-mono">
                                    <span>$2</span>
                                    <span>$100</span>
                                </div>
                            </div>

                            {/* Complexity Selector */}
                            <div>
                                <label className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                                    <Settings size={16} className="text-orange-500" /> Workflow Complexity
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {(['Low', 'Medium', 'High'] as const).map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setComplexity(level)}
                                            className={`py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                                                complexity === level 
                                                    ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]' 
                                                    : 'bg-black/30 border-white/5 text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
                                            }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Panel */}
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="bg-gradient-to-br from-[#1a0f08] to-[#0a0604] border border-orange-500/20 rounded-3xl p-8 flex flex-col relative overflow-hidden shadow-[0_20px_50px_rgba(249,115,22,0.1)]">
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 rounded-full blur-[50px] pointer-events-none" />
                        
                        <h3 className="text-xl font-serif text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
                            <TrendingUp className="text-orange-400" /> Impact Projection
                        </h3>

                        <div className="space-y-6 flex-1">
                            <div className="flex justify-between items-center group">
                                <span className="text-zinc-400 text-sm font-medium group-hover:text-zinc-300 transition-colors">Current Monthly Cost</span>
                                <span className="text-white font-mono text-lg">{formatCurrency(currentMonthlyCost)}</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="text-zinc-400 text-sm font-medium group-hover:text-zinc-300 transition-colors flex items-center gap-2">
                                    AI Automated Cost <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">New</span>
                                </span>
                                <span className="text-orange-400 font-mono text-lg">{formatCurrency(newMonthlyCost)}</span>
                            </div>
                            
                            <div className="pt-6 border-t border-white/10 mt-6 relative">
                                <span className="text-zinc-400 text-sm font-bold uppercase tracking-widest block mb-2">Estimated Monthly Savings</span>
                                <div className="text-4xl md:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-lg mb-2">
                                    {formatCurrency(animatedSavings)}
                                </div>
                                <div className="flex items-center gap-2 text-emerald-500/80 text-sm font-bold">
                                    <CheckCircle2 size={14} /> {(automationRate * 100).toFixed(0)}% of tasks automated
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-orange-500/10">
                            <div className="flex items-end justify-between mb-6">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Projected Annual Savings</span>
                                    <span className="text-2xl font-bold text-white">{formatCurrency(annualSavings)}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-1">ROI</span>
                                    <span className="text-2xl font-bold text-orange-400">+{roiPercentage}%</span>
                                </div>
                            </div>
                            
                            <button className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-500 to-yellow-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group">
                                Start Your Implementation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DynamicCostCalculator;
