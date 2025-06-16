"use client";

import NextImage from "next/image";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Undo,
  Redo,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import DiscussionsTab from "@/components/tabs/discussions-tab";

const tabs = ["Brief", "Discussions", "Media", "Timeline", "Other"];

const ProjectPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("Brief");
  const [content, setContent] = useState(`
  <h2>Description</h2>
  <p>
    The Vienna Summer School, hosted by the American University in Bulgaria, offers a transformative one-month learning experience for a cohort of 20 students. This program provides intensive training in Digital Marketing and Mobile Journalism, equipping students with the necessary tools, skills, and techniques to thrive in these fields. The school adopts an applied learning approach where students use their newly acquired knowledge to work on real-world projects that have a direct civic impact. This year, the focus is on supporting refugee businesses and showcasing the humanity and resilience of refugees settled in Austria.
  </p>
  <h2>Aim</h2>
  <p>
    To enhance students' academic and practical competencies by fostering empathy, civic responsibility, and social impact through collaboration with local refugee communities.
  </p>
  <h2>Goals</h2>
  <ul>
    <li><strong>Skill Development:</strong> Equip students with practical knowledge in digital marketing and mobile journalism.</li>
    <li><strong>Civic Engagement:</strong> Foster social responsibility by helping refugee businesses and sharing their stories.</li>
    <li><strong>Community Impact:</strong> Create sustainable social media strategies and campaigns that benefit the refugee community.</li>
    <li><strong>Cross-Cultural Understanding:</strong> Build bridges between refugees and the local community by highlighting their experiences and aspirations.</li>
    <li><strong>Portfolio Building:</strong> Enable students to develop impactful projects for evaluation and future professional use.</li>
  </ul>
  <h2>Key Focus Points</h2>
  <ul>
    <li><strong>Learning Modules:</strong> Each week combines theoretical sessions, hands-on workshops, and applied project work. Students are taught by expert faculty in digital marketing and mobile journalism.</li>
    <li><strong>Collaboration:</strong> Students are paired in teams and assigned a refugee business owner as their project partner. Teams are responsible for understanding the business's unique needs and goals.</li>
    <li><strong>Templates and Tools:</strong> Students will use provided templates for:
      <ul>
        <li>Marketing Campaign Plans</li>
        <li>Social Media Content Calendars</li>
        <li>Journalism Storyboards</li>
        <li>Impact Reports (to measure campaign effectiveness)</li>
      </ul>
    </li>
  </ul>
  <h2>Civic and Community Impact</h2>
  <p>
    This summer school goes beyond academic learning by addressing pressing social challenges. Refugees often face barriers in integrating into local economies and society. By documenting their stories and enhancing their business presence, the Vienna Summer School helps:
  </p>
  <ul>
    <li><strong>Humanize Refugees:</strong> Through authentic storytelling, students showcase the personal journeys of refugees, highlighting their resilience and shared humanity.</li>
    <li><strong>Boost Local Businesses:</strong> Refugee businesses receive tailored digital marketing strategies that increase their visibility and customer base.</li>
    <li><strong>Build Community Understanding:</strong> The showcase event invites local community members to engage with refugees and learn about their contributions to society.</li>
    <li><strong>Inspire Long-Term Change:</strong> Students and community members alike leave with a greater awareness of refugee issues and the role they can play in fostering inclusion.</li>
  </ul>
  `);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: content,
    immediatelyRender: false,
    editable: isEditing,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditing);
    }
  }, [isEditing, editor]);

  const toggleEdit = () => {
    const newEditingState = !isEditing;
    setIsEditing(newEditingState);
  };

  const MenuBar = () => {
    if (!editor || !isEditing) return null;

    return (
      <div className="border border-gray-300 border-b-0 rounded-t-lg p-2 bg-gray-50 flex flex-wrap gap-1">
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={`px-3 py-2 rounded hover:bg-gray-200 font-semibold ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
          }`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().setParagraph().run();
          }}
          className={`px-3 py-2 rounded hover:bg-gray-200 ${
            editor.isActive("paragraph") ? "bg-gray-300" : ""
          }`}
          title="Paragraph"
        >
          P
        </button>
        <div className="w-px h-8 bg-gray-300 mx-1" />
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("bold") ? "bg-gray-300" : ""
          }`}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          }`}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <div className="w-px h-8 bg-gray-300 mx-1" />
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("bulletList") ? "bg-gray-300" : ""
          }`}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("orderedList") ? "bg-gray-300" : ""
          }`}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
        <div className="w-px h-8 bg-gray-300 mx-1" />
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            const url = window.prompt("URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("link") ? "bg-gray-300" : ""
          }`}
          title="Add Link"
        >
          <LinkIcon size={16} />
        </button>
        <div className="w-px h-8 bg-gray-300 mx-1" />
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          title="Undo"
        >
          <Undo size={16} />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          title="Redo"
        >
          <Redo size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="relative flex items-center text-white h-108">
        <NextImage
          src="/project-background.png"
          alt="Project"
          priority
          fill
          style={{
            position: "absolute",
            objectFit: "cover",
            filter: "brightness(30%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold mb-2">
            Vienna Summer School 2024:
          </h1>
          <p className="text-4xl leading-[70px] font-bold">
            Empowering Refugee Businesses through Digital Marketing and Mobile
            Journalism in Vienna
          </p>
        </div>
      </div>
      <div className="p-16 flex items-center">
        <nav className="flex max-w-min space-x-8 border-t-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pt-4 pb-2 border-b-4 font-bold text-3xl ${
                activeTab === tab
                  ? "border-[#74C7FE]"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        {activeTab === "Brief" && (
          <div className="flex justify-end ml-auto gap-2">
            {isEditing && (
              <Button variant="secondary" onClick={toggleEdit}>
                Cancel
              </Button>
            )}
            <Button onClick={toggleEdit} className="bg-dpro-primary text-white">
              {isEditing ? "Save Changes" : "Edit Content"}
            </Button>
          </div>
        )}
      </div>
      <div className="px-16">
        <div>
          {activeTab === "Brief" && (
            <>
              {isEditing && <MenuBar />}
              <div
                className={`${
                  isEditing
                    ? "border border-gray-300 rounded-b-lg min-h-[600px]"
                    : ""
                }`}
              >
                {isEditing ? (
                  <EditorContent
                    editor={editor}
                    className="prose prose-lg max-w-none p-6 focus:outline-none"
                  />
                ) : (
                  <div
                    className="prose prose-lg"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                )}
              </div>
            </>
          )}

          {activeTab === "Discussions" && <DiscussionsTab />}

          {activeTab === "Media" && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Media</h2>
              <p className="text-gray-600">Media content coming soon...</p>
            </div>
          )}

          {activeTab === "Timeline" && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Timeline
              </h2>
              <p className="text-gray-600">Timeline content coming soon...</p>
            </div>
          )}

          {activeTab === "Other" && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Other</h2>
              <p className="text-gray-600">Other content coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
