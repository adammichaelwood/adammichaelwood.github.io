---
layout: essay
title: "CMAA - Now With 100% More Github"
author: Adam Michael Wood
original_appearance: 
  title: Chant Cafe
  url: http://www.chantcafe.com/2013/04/cmaa-now-with-100-more-github.html
  date: 2013-04-29T00:00:00
description: I've mentioned before that I think we (that is, creators and users of Sacred Music) should adopt some of the tools and techniques of Open Source development. Differences of opinion in the <i>Free vs. Copyrighted</i> realm aside, I have to assume that most people 'round these parts have seen the value of free resources made available by or through CMAA.
---

<i>tl;dr -- <a href="https://github.com/CMAA">https://github.com/CMAA</a></i>

<p>I've mentioned before that I think we (that is, creators and users of Sacred Music) should adopt some of the tools and techniques of Open Source development. Differences of opinion in the <i>Free vs. Copyrighted</i> realm aside, I have to assume that most people 'round these parts have seen the value of free resources made available by or through CMAA.</p>

<p>Unfortunately, up to now, all the resources that have been made available publicly have been finished products- PDFs and/or printed books. These have the greatest immediate impact, since they can used right away by almost anybody. However, the problem here is that anyone wishing to expand upon any particular project or source has to spend time and energy to needlessly re-create the work of someone else.</p>

<p>In many cases this is unavoidable: We don't have source files for a book printed 100 years ago- we just have the book, and now (thanks to JT's scanner) we have a digital copy of it. But in many cases, there are files- or there could be. If you have typeset a piece of music in square notes using Gregorio, you have a source file. By all means, publish the compiled PDF- most people wouldn't know what to do with a GABC file in the first place. But someone who does know might be able to use it: to re-set the music with a translation, to re-compile it with an improved rendering engine, to resize and reformat it to fit the style of their own publication or congregational worship aide.</p>

<p>Gregorio and Lilypond files are probably the most prevalent of the existing works that could be made available publicly. Simple text files of hymn texts and translations (either in the public domain or released via Creative Commons) would also be helpful to people. There was a discussion on the CMAA forums a while ago related to setting music for Braille- a process which requires (if I remember correctly) having the music in XML format. And heck- even though text-based version-control doesn't work all that well for it, there's nothing all that wrong with making Finale or Sibelius files available as well. </p>

<p>So- to that end, <a href="https://github.com/CMAA">we now have a CMAA account at GitHub</a>. The rest of this post is an explanation of what that means and how to use it, not (mostly) about why.</p>

<h3>What is GitHub, anyway?</h3>
<p>GitHub is a version control platform with built-in social and collaboration features. Yeah, yeah- but what does that mean?</p>

<dl>
<dt>Version Control</dt>
<dd>You want the latest version of a file, right? But maybe you want to see an earlier version. Maybe one of the other people working on it messed it up and you want to revert to an earlier version. Maybe you'd like to see the evolution of an idea through multiple iterations of the same file.</dd>
<dd>A Version Control system (in its simplest form) stores each version of a file, going back to the creation of that file. A group of files is stored in a Repository (or "repo"), and you can go back and see (or use) the repo as it was at any point in the past.</dd>
<dd>For more information, see <a href="http://en.wikipedia.org/wiki/Version_control">this article about the idea of Version Control in general</a>.</dd>
<dt>built-in social... features</dt>
<dd>A little bit like Facebook. GH allows people to follow each other's projects, getting updates and so forth. This brings the possibility for the type of communication and community that we've come to know at the CMAA forums into the actual process of resource creation.</dd>
<dt>built in... collaboration features</dt>
<dd>Issue tracking, repo-specific wikis, the ability to fork/branch/merge repos. The ability to easily see diffs (what has changed from one version to another).</dd>
</dl>

<h3>How is this organized? Do I just upload my stuff somewhere?</h3>
<p>GitHub uses "repos" (Repositories). A single repo is a single project, which might contain several, or several thousand, files. If you wanted to use GitHub to keep track of a project to transcribe the entire Gradual Romanum into Gregorio notation, that would be one single repo.</p>
<p>Since it is likely that many people have small, one-off projects that don't need an entire repo to themselves ("I wrote this one hymn... you can use it if you want."), we will probably create one or more "catch-all" repos for those items.</p>
<p>If you are moderately savvy at this sort of thing, go create a GitHub account. You can create your own repos (which CMAA can then follow, to let people know where they are), or if you have a project you'd like CMAA to house, send us a note through GH and we'll make it happen. This is still a little new (obviously) so we're trying to work out the best way to handle it- so just drop me a line and we'll figure it out together. </p>
<p>If this whole thing seems totally confusing, but you want to make your stuff available- just email me or post it to the forums. I can easily GitHub-ize your project and post it myself.</p>

<h3>Once something is at GitHub, what can happen to it?</h3>
<p>The whole point of GitHubbing (yeah, I verbed it) is that it allows people to collaborate, fork, and merge.</p>
<dl>
<dt>Collaborate</dt>
<dd>Suppose you have a giant project- like doing a Gregorio transcription of the entire Graduale Romanum. With GitHub, people could just volunteer to do a couple pages or a single chant, and it's pretty easy to combine that effort so that everyone is contributing to a single source.</dd>
<dt>Fork</dt>
<dd>Forking a project means (in essence) making a complete copy of it into a new repo, so that you can take the project in a different direction without interfering with the original.</dd>
<dt>Merge</dt>
<dd>A merge is the opposite of a fork- bringing back together two different lines of a project.</dd>
</dl>

<h3>Any specific big plans for GitHub?</h3>
<p>So far- just see what happens. I'm sure it will be wholly unimpressive for the short-term. I'm hoping to start creating repos out of some of the work already available, though scattered around a bit, on the Forum and the CMAA website. If you have source files for anything you've worked on or are in the middle of, which you'd like CMAA to host, please let us know.</p>

<p>I'm hopeful that, once a critical handful of people get comfortable with GitHub and (more importantly) text-based music engraving, we'll see some cool things come out of it.</p>

<p>In the meantime, I'm also trying to put together some general "development guides" that would be helpful for all of this- suggestions for project organization, file formats- that sort of thing. Obviously, nothing like "you must do it this way" - just some evolving thoughts on how to use these tools. This article is part of <a href="https://github.com/CMAA/CMAA-GitHub-Guide">the first commit to that repo.</a></p>

<h3>Where can I learn more?</h3>
<p>I wrote two lengthy articles about Open Source Sacred Music at my blog. <a href="http://musicforsunday.com/2013/open-source-sacred-music" target="_new">The first one lays out the foundations of my thinking on the matter</a>. If you want to skip all my anti-IP propaganda, go right to the last paragraph which has links to other educational resources. <a href="http://musicforsunday.com/2013/open-source-for-sacred-music-infrastructure" target="_new">The second one covers my thoughts related to specific projects which might be useful</a>, so if you're thinking of starting something, but don't know what, check that out.</p>
<p>And, just to be clear- you certainly don't need to agree with me about issues like Intellectual Property law (or anything else, really) to get involved with any of this. The tools of Open Source are just that- tools. Good ones, in my opinion.</p>

<!-- END // CMAA - NOW WITH 100% MORE GITHUB -->