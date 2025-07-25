'use client';

import React, { useState } from 'react';
import { PenTool, Sparkles, Copy, Download, RefreshCw } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Card from './ui/Card';
import Badge from './ui/Badge';

interface BlogData {
  topic: string;
  tone: string;
  content: string;
}

const toneOptions = [
  { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
  { value: 'professional', label: 'Professional', description: 'Formal and business-like' },
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { value: 'informative', label: 'Informative', description: 'Educational and detailed' },
  { value: 'persuasive', label: 'Persuasive', description: 'Compelling and convincing' },
];

const generateDummyContent = (topic: string, tone: string): string => {
  const introductions = {
    casual: `Hey there! Let's dive into the fascinating world of ${topic}. I've been thinking about this lately, and there's so much to unpack here.`,
    professional: `In today's rapidly evolving landscape, understanding ${topic} has become increasingly crucial for businesses and professionals alike.`,
    friendly: `Welcome, friend! I'm excited to share some insights about ${topic} with you today. It's one of those topics that really gets me excited!`,
    informative: `${topic} represents a complex and multifaceted subject that requires careful examination and analysis to fully comprehend its implications.`,
    persuasive: `Imagine a world where ${topic} transforms the way we think, work, and live. This isn't just a possibility—it's happening right now.`,
  };

  const bodies = {
    casual: `So here's the thing about ${topic} - it's not as complicated as people make it out to be. I remember when I first started learning about this stuff, I was totally overwhelmed. But once you break it down into bite-sized pieces, it all starts to make sense.

The cool thing is that ${topic} affects pretty much everyone these days. Whether you realize it or not, you're probably already interacting with it in some way. And honestly, that's pretty amazing when you think about it.

What really gets me excited is how this field is constantly evolving. Just when you think you've got it all figured out, something new comes along and changes the game completely.`,
    
    professional: `The strategic implementation of ${topic} requires a comprehensive understanding of both current market dynamics and future technological trends. Organizations that fail to adapt to these changes risk falling behind their competitors in an increasingly digital marketplace.

Key considerations include scalability, security, and user experience optimization. These factors must be carefully balanced to ensure successful deployment and long-term sustainability of any ${topic}-related initiatives.

Furthermore, stakeholder buy-in and proper change management protocols are essential for smooth transitions and maximum return on investment.`,
    
    friendly: `You know what I love about ${topic}? It brings people together! I've met so many amazing individuals through my journey with this subject, and each conversation has taught me something new.

The best part is that you don't need to be an expert to get started. Everyone begins somewhere, and the community around ${topic} is incredibly welcoming and supportive. Don't be afraid to ask questions or share your own experiences.

I always tell people that the learning never stops with ${topic}. Every day brings new discoveries and opportunities to grow.`,
    
    informative: `To fully understand ${topic}, we must first examine its historical context and foundational principles. The development of this field can be traced back several decades, with significant milestones occurring at regular intervals.

Current research indicates that ${topic} encompasses several key components: theoretical frameworks, practical applications, and emerging methodologies. Each of these elements plays a crucial role in the overall ecosystem.

Recent studies have shown measurable impacts across various sectors, with adoption rates increasing by approximately 15-20% annually over the past five years.`,
    
    persuasive: `The time to embrace ${topic} is now. While others hesitate and debate, forward-thinking individuals and organizations are already reaping the benefits of early adoption.

Consider this: every day you delay is a day your competitors gain ground. The market leaders of tomorrow are those who recognize opportunity today and act decisively.

Don't let fear of the unknown hold you back. The risks of inaction far outweigh the challenges of moving forward. Your future self will thank you for taking this crucial step today.`,
  };

  const conclusions = {
    casual: `So there you have it! ${topic} in a nutshell. I hope this gives you a good starting point to explore further. Remember, the best way to learn is by doing, so don't be afraid to jump in and start experimenting. You've got this!`,
    professional: `In conclusion, ${topic} represents a significant opportunity for organizations willing to invest in proper planning and execution. The strategic advantages gained through early adoption will prove invaluable in maintaining competitive positioning in the marketplace.`,
    friendly: `Thanks for joining me on this exploration of ${topic}! I hope you found it as interesting as I do. Feel free to reach out if you have any questions or want to share your own experiences. I'd love to hear from you!`,
    informative: `This overview of ${topic} provides a foundation for further study and practical application. Continued research and development in this field promise exciting advances and new opportunities for innovation in the coming years.`,
    persuasive: `The choice is yours. You can continue with the status quo and watch from the sidelines, or you can take action and position yourself at the forefront of the ${topic} revolution. The future belongs to those who dare to seize it.`,
  };

  return `${introductions[tone as keyof typeof introductions]}

${bodies[tone as keyof typeof bodies]}

${conclusions[tone as keyof typeof conclusions]}`;
};

export default function BlogGenerator() {
  const [topic, setTopic] = useState('');
  const [selectedTone, setSelectedTone] = useState('casual');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedBlog, setGeneratedBlog] = useState<BlogData | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const content = generateDummyContent(topic, selectedTone);
    setGeneratedBlog({
      topic,
      tone: selectedTone,
      content
    });
    
    setIsLoading(false);
  };

  const handleCopy = async () => {
    if (generatedBlog) {
      await navigator.clipboard.writeText(generatedBlog.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (generatedBlog) {
      const element = document.createElement('a');
      const file = new Blob([generatedBlog.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${generatedBlog.topic.replace(/\s+/g, '-').toLowerCase()}-blog.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleReset = () => {
    setTopic('');
    setSelectedTone('casual');
    setGeneratedBlog(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl">
              <PenTool className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Blog Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your ideas into engaging blog content with the power of AI. 
            Simply enter your topic, choose your tone, and watch the magic happen.
          </p>
        </div>

        {/* Input Form */}
        <Card className="mb-8">
          <div className="space-y-6">
            <Input
              label="Blog Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., The Future of Artificial Intelligence"
              disabled={isLoading}
              helperText="Enter the main topic you want to write about"
            />

            <Select
              label="Writing Tone"
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              options={toneOptions}
              disabled={isLoading}
              helperText="Choose the style and tone for your blog post"
            />

            <Button
              onClick={handleGenerate}
              disabled={!topic.trim() || isLoading}
              loading={isLoading}
              icon={isLoading ? RefreshCw : Sparkles}
              size="lg"
              className="w-full"
            >
              {isLoading ? 'Generating Amazing Content...' : 'Generate Blog'}
            </Button>
          </div>
        </Card>

        {/* Generated Content */}
        {generatedBlog && (
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {generatedBlog.topic}
                </h2>
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  <Badge variant="primary">
                    {toneOptions.find(t => t.value === generatedBlog.tone)?.label} Tone
                  </Badge>
                  <Badge variant="secondary">
                    {generatedBlog.content.split(' ').length} words
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="sm"
                  icon={Copy}
                >
                  Copy To Clipboard
                </Button>
                <Button
                  onClick={handleDownload}
                  variant="ghost"
                  size="sm"
                  icon={Download}
                >Download as text file</Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                >
                  New Blog
                </Button>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {generatedBlog.content}
                </div>
              </div>
            </div>

            {copied && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm font-medium">
                  ✓ Content copied to clipboard!
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered</h3>
            <p className="text-gray-600">
              Advanced AI algorithms generate high-quality, engaging content tailored to your needs.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <PenTool className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple Tones</h3>
            <p className="text-gray-600">
              Choose from various writing styles to match your brand voice and audience.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-gray-600">
              Get professional-quality blog content in seconds, not hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}